#!/usr/bin/env bash

set -euo pipefail

readonly SCRIPT_UNDER_TEST="$(cd "$(dirname "$0")/.." && pwd)/project_console.sh"

TEST_COUNT=0
FAIL_COUNT=0

strip_ansi() {
	sed -E $'s/\x1B\[[0-9;]*[A-Za-z]//g'
}

assert_contains() {
	local haystack="$1"
	local needle="$2"
	if [[ "$haystack" != *"$needle"* ]]; then
		printf 'Assertion failed: expected output to contain "%s"\n' "$needle" >&2
		return 1
	fi
}

assert_matches() {
	local value="$1"
	local pattern="$2"
	if [[ ! "$value" =~ $pattern ]]; then
		printf 'Assertion failed: value did not match pattern %s\n' "$pattern" >&2
		return 1
	fi
}

run_test() {
	local test_name="$1"
	TEST_COUNT=$((TEST_COUNT + 1))
	if "$test_name"; then
		printf '[PASS] %s\n' "$test_name"
	else
		FAIL_COUNT=$((FAIL_COUNT + 1))
		printf '[FAIL] %s\n' "$test_name" >&2
	fi
}

test_snapshot_commit_message_is_timestamped() {
	(
		local output
		output="$(bash -c 'source "$1" && snapshot_commit_message' _ "$SCRIPT_UNDER_TEST")"
		assert_matches "$output" '^chore\(snapshot\): save project state - [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$'
	)
}

test_build_log_table_displays_commit_metadata() {
	(
		local temp_dir raw_output output
		temp_dir="$(mktemp -d)"
		trap 'rm -rf "$temp_dir"' EXIT

		git init -q "$temp_dir"
		git -C "$temp_dir" config user.name 'Test User'
		git -C "$temp_dir" config user.email 'test@example.com'
		printf 'hello\n' > "$temp_dir/README.md"
		git -C "$temp_dir" add README.md
		git -C "$temp_dir" commit -q -m 'Initial demo commit'

		raw_output="$(bash -c 'cd "$1" && source "$2" && build_log_table' _ "$temp_dir" "$SCRIPT_UNDER_TEST")"
		output="$(printf '%s\n' "$raw_output" | strip_ansi)"
		assert_contains "$output" 'COMMIT'
		assert_contains "$output" 'Initial demo commit'
		assert_contains "$output" 'Test User'
	)
}

test_save_latest_changes_creates_snapshot_commit() {
	(
		local temp_dir latest_subject
		temp_dir="$(mktemp -d)"
		trap 'rm -rf "$temp_dir"' EXIT

		git init -q "$temp_dir"
		git -C "$temp_dir" config user.name 'Test User'
		git -C "$temp_dir" config user.email 'test@example.com'
		printf 'base\n' > "$temp_dir/file.txt"
		git -C "$temp_dir" add file.txt
		git -C "$temp_dir" commit -q -m 'Base commit'
		printf 'delta\n' >> "$temp_dir/file.txt"

		bash -c 'cd "$1" && source "$2" && save_latest_changes >/dev/null' _ "$temp_dir" "$SCRIPT_UNDER_TEST"

		latest_subject="$(git -C "$temp_dir" log -1 --pretty=%s)"
		assert_matches "$latest_subject" '^chore\(snapshot\): save project state - '
		[[ -z "$(git -C "$temp_dir" status --porcelain)" ]]
	)
}

test_sync_all_remote_branches_creates_tracking_branches() {
	(
		local remote_dir seed_dir work_dir tracking
		remote_dir="$(mktemp -d)"
		seed_dir="$(mktemp -d)"
		work_dir="$(mktemp -d)"
		trap 'rm -rf "$remote_dir" "$seed_dir" "$work_dir"' EXIT

		git init -q --bare "$remote_dir/remote.git"
		git init -q "$seed_dir"
		git -C "$seed_dir" config user.name 'Test User'
		git -C "$seed_dir" config user.email 'test@example.com'
		printf 'root\n' > "$seed_dir/README.md"
		git -C "$seed_dir" add README.md
		git -C "$seed_dir" commit -q -m 'Seed main'
		git -C "$seed_dir" branch -M main
		git -C "$seed_dir" remote add origin "$remote_dir/remote.git"
		git -C "$seed_dir" push -q -u origin main
		git -C "$seed_dir" checkout -q -b dev
		printf 'dev\n' > "$seed_dir/dev.txt"
		git -C "$seed_dir" add dev.txt
		git -C "$seed_dir" commit -q -m 'Seed dev'
		git -C "$seed_dir" push -q -u origin dev

		git clone -q "$remote_dir/remote.git" "$work_dir"
		bash -c 'cd "$1" && source "$2" && sync_all_remote_branches >/dev/null' _ "$work_dir" "$SCRIPT_UNDER_TEST"

		tracking="$(git -C "$work_dir" for-each-ref --format='%(upstream:short)' refs/heads/dev)"
		[[ "$tracking" == 'origin/dev' ]]
	)
}

run_test test_snapshot_commit_message_is_timestamped
run_test test_build_log_table_displays_commit_metadata
run_test test_save_latest_changes_creates_snapshot_commit
run_test test_sync_all_remote_branches_creates_tracking_branches

printf '\nExecuted %d tests\n' "$TEST_COUNT"

if (( FAIL_COUNT > 0 )); then
	printf 'Failures: %d\n' "$FAIL_COUNT" >&2
	exit 1
fi

printf 'All tests passed\n'