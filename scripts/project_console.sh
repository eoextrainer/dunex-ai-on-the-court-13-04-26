#!/usr/bin/env bash

set -euo pipefail

# Interactive Git operations console for this repository.
#
# The script is intentionally dependency-light so it can run on a standard
# macOS or Linux shell without installing extra tooling.

readonly PROJECT_CONSOLE_NAME="AI on the Court Project Console"
readonly COLOR_RESET='\033[0m'
readonly COLOR_BOLD='\033[1m'
readonly COLOR_BLUE='\033[38;5;39m'
readonly COLOR_GOLD='\033[38;5;220m'
readonly COLOR_GREEN='\033[38;5;82m'
readonly COLOR_RED='\033[38;5;197m'
readonly COLOR_CYAN='\033[38;5;45m'
readonly COLOR_PURPLE='\033[38;5;141m'
readonly COLOR_GREY='\033[38;5;244m'

if git rev-parse --show-toplevel >/dev/null 2>&1; then
	readonly REPO_ROOT="$(git rev-parse --show-toplevel)"
else
	readonly REPO_ROOT="$(pwd)"
fi

color_echo() {
	local color="$1"
	shift
	printf '%b%s%b\n' "$color" "$*" "$COLOR_RESET"
}

timestamp_now() {
	date '+%Y-%m-%d %H:%M:%S'
}

snapshot_commit_message() {
	printf 'chore(snapshot): save project state - %s' "$(timestamp_now)"
}

rollback_backup_branch_name() {
	date '+rollback-backup-%Y%m%d-%H%M%S'
}

working_tree_has_changes() {
	[[ -n "$(git status --porcelain)" ]]
}

strip_remote_prefix() {
	sed 's#^origin/##'
}

list_remote_branches() {
	git for-each-ref --format='%(refname:short)' 'refs/remotes/origin/*' \
		| grep '^origin/' \
		| sed '/^origin\/HEAD$/d' \
		| strip_remote_prefix
}

print_banner() {
	printf '\n'
	color_echo "$COLOR_BLUE" '============================================================'
	color_echo "$COLOR_GOLD" '   ___    ___      ___          ______          ________    '
	color_echo "$COLOR_GOLD" '  / _ |  / _ )    / _ |  ___   /_  __/___ ___  / ___/ __ \   '
	color_echo "$COLOR_GOLD" ' / __ | / _  |   / __ | / _ \   / /  / -_) _ \/ /__/ /_/ /   '
	color_echo "$COLOR_GOLD" '/_/ |_|/____/   /_/ |_| \___/  /_/   \__/ .__/\___/\____/    '
	color_echo "$COLOR_GOLD" '                                        /_/                 '
	color_echo "$COLOR_BLUE" '============================================================'
	color_echo "$COLOR_CYAN" "$PROJECT_CONSOLE_NAME"
	color_echo "$COLOR_GREY" "Repository: $REPO_ROOT"
	printf '\n'
}

print_menu() {
	color_echo "$COLOR_PURPLE" '+----------------------------------------------------------+'
	color_echo "$COLOR_GREEN"  '| 1 | Save latest changes                                  |'
	color_echo "$COLOR_GOLD"   '| 2 | Roll back to a previous stable version               |'
	color_echo "$COLOR_CYAN"   '| 3 | Deploy latest committed changes                      |'
	color_echo "$COLOR_BLUE"   '| 4 | Sync all remote branches to local tracking branches  |'
	color_echo "$COLOR_RED"    '| 5 | Exit                                                 |'
	color_echo "$COLOR_PURPLE" '+----------------------------------------------------------+'
}

pause_for_user() {
	printf '\n'
	read -r -p 'Press Enter to continue... ' _
}

build_log_table() {
	printf '%b%-14s%b | %-19s | %-18s | %s\n' "$COLOR_GOLD" 'COMMIT' "$COLOR_RESET" 'DATE' 'AUTHOR' 'MESSAGE'
	printf '%s\n' '-----------------------------------------------------------------------------------------------'
	git log --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%h%x1f%ad%x1f%an%x1f%s' \
	| while IFS=$'\x1f' read -r hash commit_date author subject || [[ -n "${hash:-}" ]]; do
		printf '%b%-14s%b | %-19s | %-18.18s | %s\n' \
			"$COLOR_GOLD" "$hash" "$COLOR_RESET" "$commit_date" "$author" "$subject"
	done
}

show_log_history() {
	build_log_table | less -R
}

save_latest_changes() {
	if ! working_tree_has_changes; then
		color_echo "$COLOR_CYAN" 'No local changes detected. Nothing to save.'
		return 0
	fi

	local stash_label
	stash_label="safety-stash before snapshot $(timestamp_now)"

	git stash push --include-untracked -m "$stash_label" >/dev/null
	git stash apply --quiet stash@{0}
	git add -A

	if git diff --cached --quiet; then
		git stash drop --quiet stash@{0} >/dev/null 2>&1 || true
		color_echo "$COLOR_CYAN" 'No staged delta after safety restore. Nothing committed.'
		return 0
	fi

	git commit -m "$(snapshot_commit_message)"
	git stash drop --quiet stash@{0} >/dev/null 2>&1 || true
	color_echo "$COLOR_GREEN" 'Latest changes saved and committed successfully.'
}

rollback_to_commit() {
	local target_commit="${1:-}"

	show_log_history
	printf '\n'
	read -r -p 'Enter the commit hash to roll back to: ' target_commit

	if [[ -z "$target_commit" ]]; then
		color_echo "$COLOR_RED" 'Rollback cancelled: no commit hash provided.'
		return 1
	fi

	git rev-parse --verify "$target_commit^{commit}" >/dev/null 2>&1

	local backup_branch
	backup_branch="$(rollback_backup_branch_name)"
	git branch "$backup_branch"
	git reset --hard "$target_commit"

	color_echo "$COLOR_GREEN" "Rollback complete. Backup branch created: $backup_branch"
}

deploy_latest_changes() {
	local current_branch
	current_branch="$(git rev-parse --abbrev-ref HEAD)"

	if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
		color_echo "$COLOR_RED" 'Deploy failed: repository has no commits yet.'
		return 1
	fi

	if git ls-remote --exit-code --heads origin "$current_branch" >/dev/null 2>&1; then
		git push origin "$current_branch"
	else
		git push -u origin "$current_branch"
	fi

	color_echo "$COLOR_GREEN" "Deployment push completed for branch: $current_branch"
}

sync_all_remote_branches() {
	local current_branch stash_created
	current_branch="$(git rev-parse --abbrev-ref HEAD)"
	stash_created='false'

	if working_tree_has_changes; then
		git stash push --include-untracked -m "sync-backup $(timestamp_now)" >/dev/null
		stash_created='true'
	fi

	git fetch --prune origin

	while IFS= read -r branch; do
		[[ -z "$branch" ]] && continue

		if git show-ref --verify --quiet "refs/heads/$branch"; then
			git checkout -q "$branch"
			git merge --ff-only "origin/$branch"
		else
			git checkout -q -b "$branch" --track "origin/$branch"
		fi
	done < <(list_remote_branches)

	git checkout -q "$current_branch"

	if [[ "$stash_created" == 'true' ]]; then
		git stash pop --quiet || true
	fi

	color_echo "$COLOR_GREEN" 'Remote branches synchronized locally.'
}

run_menu_action() {
	local choice="$1"
	case "$choice" in
		1)
			read -r -p 'Save the latest project changes now? [y/N]: ' answer
			if [[ "$answer" =~ ^[Yy]$ ]]; then
				save_latest_changes
			else
				color_echo "$COLOR_CYAN" 'Save cancelled.'
			fi
			;;
		2)
			rollback_to_commit
			;;
		3)
			deploy_latest_changes
			;;
		4)
			sync_all_remote_branches
			;;
		5)
			color_echo "$COLOR_GREY" 'Exiting project console.'
			return 1
			;;
		*)
			color_echo "$COLOR_RED" 'Invalid selection. Choose 1, 2, 3, 4, or 5.'
			;;
	esac
	return 0
}

main() {
	cd "$REPO_ROOT"
	while true; do
		clear
		print_banner
		print_menu
		printf '\n'
		read -r -p 'Select an option [1-5]: ' selection
		if ! run_menu_action "$selection"; then
			break
		fi
		pause_for_user
	done
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
	main "$@"
fi