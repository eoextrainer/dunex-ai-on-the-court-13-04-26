#!/usr/bin/env bash

set -euo pipefail

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  printf 'Repository root not found. Run this script inside the git repository.\n' >&2
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
DEMO_DIR="$REPO_ROOT/demo-app"
WORKTREE_DIR="$(mktemp -d)"
STAMP="$(date '+%Y-%m-%d %H:%M:%S')"
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

cleanup() {
  if git -C "$REPO_ROOT" worktree list | grep -Fq "$WORKTREE_DIR"; then
    git -C "$REPO_ROOT" worktree remove --force "$WORKTREE_DIR" >/dev/null 2>&1 || true
  fi
  rm -rf "$WORKTREE_DIR"
}

trap cleanup EXIT

if [[ ! -d "$DEMO_DIR" ]]; then
  printf 'demo-app directory not found at %s\n' "$DEMO_DIR" >&2
  exit 1
fi

if ! git -C "$REPO_ROOT" rev-parse --verify HEAD >/dev/null 2>&1; then
  printf 'Repository has no commits yet. Commit the project before deploying Pages.\n' >&2
  exit 1
fi

if ! git -C "$REPO_ROOT" remote get-url origin >/dev/null 2>&1; then
  printf 'Remote origin is not configured.\n' >&2
  exit 1
fi

git -C "$REPO_ROOT" worktree add --detach "$WORKTREE_DIR" HEAD >/dev/null
cd "$WORKTREE_DIR"

git checkout --orphan gh-pages >/dev/null 2>&1 || git checkout gh-pages >/dev/null 2>&1
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$DEMO_DIR"/. "$WORKTREE_DIR"/
touch .nojekyll

git add -A
if git diff --cached --quiet; then
  printf 'No demo-app changes to publish to gh-pages.\n'
  exit 0
fi

git commit -m "deploy(pages): publish demo-app from $CURRENT_BRANCH at $STAMP" >/dev/null

git push -f origin HEAD:gh-pages
printf 'Published demo-app to origin/gh-pages. Configure GitHub Pages to serve from the gh-pages branch if needed.\n'
