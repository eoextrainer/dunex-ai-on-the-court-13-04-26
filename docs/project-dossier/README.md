# AI on the Court Project Dossier

## 1. Product Intent

### Course context
- Audience: young basketball athletes attending a one-hour introduction to artificial intelligence session.
- Teaching goals: explain ideation, AI tool awareness, prompt engineering, and hallucination handling through a fun and reliable demo.
- Delivery constraint: the app must run locally without a database or backend service dependency.

### Product statement
AI on the Court has evolved into a static arcade-style single-page application. The shipped UI now opens with a fullscreen splash video, then a home gallery that launches multiple mini apps inside one browser shell: the AI workshop app, an original puzzle game, and a set of elegant future-app placeholders.

## 2. Ideation

### Problem to solve
The instructor needs a dependable teaching aid that demonstrates core AI concepts in a sports context without spending class time on infrastructure issues.

### Experience pillars
- Fast start: open the app locally in a browser with minimal setup.
- Youth-friendly visuals: bold color, strong contrast, short blocks of text, immediate interactions.
- Teaching-first interactions: each screen should reinforce one AI learning goal.
- Low operational risk: no database, no external API dependency, no required login.

### Primary user stories
1. As an instructor, I can open the app quickly before class and trust it to work offline or on a local network.
2. As a student, I can click through clear sections and use simple keys to interact with the lesson.
3. As a developer, I can save work, inspect history, roll back, deploy, and sync branches from a guided terminal menu.

## 3. Planning

### Functional scope
- Static SPA in HTML, CSS, and JavaScript.
- Local browser launch via static file or Python HTTP server.
- Keyboard and mouse support.
- Single-file frontend with inline CSS and JavaScript for reliability.
- Fullscreen splash screen with embedded looping video and a visible ten-second progress timeline.
- Home gallery screen that launches multiple mini apps.
- Bilingual English and French toggle.
- Built-in basketball shot clock with 24-second and 14-second presets.
- Presentation mode with larger text and cleaner spacing.
- Interactive sections for ideation, prompt engineering, hallucination handling, recap, and an original puzzle game.
- Git workflow helper script for save, rollback, deploy, and branch sync.
- Deployment path for the static app to GitHub Pages.

### Non-functional scope
- Portable documentation in Markdown.
- Bash automation with no third-party shell framework required.
- Unit test coverage for the Bash developer console.
- Safe rollback flow with automatic backup branch creation before reset.

### Out of scope for this phase
- User accounts.
- Persistent storage.
- Online AI model integration.
- Analytics.
- Mobile app packaging.

## 4. Architecture

### Runtime architecture
The project currently contains two parallel areas:

1. `demo-app/`
   A static browser application used for the course demonstration and arcade shell. The production UI lives entirely in `demo-app/index.html` as one portable file with inline styles and behavior, and now includes a splash layer, a home launcher, the AI workshop app, and an original puzzle mini app.

2. `client/`, `server/`, `syntaxes/`
   The original language-service sample already present in the repository.

The course app remains intentionally isolated inside `demo-app/` so it can be served independently from the extension sample.

### Delivery architecture
- Local development: direct file open or `python3 -m http.server` from `demo-app/`.
- Source control: Git with dedicated local helper console.
- Remote deployment: GitHub Pages workflow publishing the `demo-app/` directory.

### Operational architecture
- UI navigation flow: splash screen, home launcher, mini-app routing, and in-app tool panels.
- Teaching flow: Learn, Idea Builder, Prompt Lab, Truth Check, and Lightning Quiz inside the AI lesson app.
- Game flow: original puzzle board, piece rack, row and column clearing, and score tracking.
- Live delivery tools: shot clock, presentation mode, score cards, language toggle, and smoke-test entry point.
- Save flow: create a safety stash, restore it into the working tree, stage everything, commit with a timestamped message.
- Rollback flow: display a colored, scrollable commit history, create a backup branch, reset to the selected commit.
- Deploy flow: push the current branch to `origin`.
- Sync flow: fetch remote branches, create missing local tracking branches, fast-forward local branches to their remote equivalents.

## 5. Codebase Map

### Course app files
- `demo-app/index.html`: final single-file SPA containing the splash screen, home launcher, AI workshop app, original puzzle app, styles, translations, and interactions.
- `demo-app/AI-vid-1.mp4`: bundled splash-screen video asset used both locally and after deployment.

### Developer operations files
- `scripts/project_console.sh`: interactive Bash console for project operations.
- `scripts/tests/project_console_test.sh`: self-contained Bash unit tests.

### Deployment files
- `.github/workflows/deploy-demo-app.yml`: GitHub Pages deployment workflow for the static app.

### Root configuration
- `package.json`: repository scripts, including the project console test command.
- `.gitignore`: ignore patterns for local build and OS artifacts.

## 6. Unit Test Strategy

### Implemented now
The Bash developer console has unit coverage for:
- timestamped commit message formatting
- colored log table generation
- save-and-commit flow
- remote branch synchronization flow

### Suggested next step for the SPA
Because the browser app is a single static HTML file, the test layer is intentionally lightweight. A browser-native smoke test now ships at `demo-app/smoke-test.html` and loads the live app in an iframe so the exact deployed UI can be checked without adding a frontend toolchain.

### Current browser smoke coverage
- splash-bypass launch path for automation
- home gallery rendering and app launching
- hero and section navigation rendering
- English/French language toggle
- shot clock preset, start, pause, and reset behavior
- prompt analysis scoring and improved prompt output
- truth check feedback and score update behavior
- quiz interaction and answer feedback
- original puzzle app launch and score-changing block placement
- presentation mode toggle

### Suggested next step for the SPA
If deeper coverage is needed later, the next increment should be Playwright or another headless browser runner that automates the same checks in CI.

## 7. Deployment Configuration

### Local deployment
Run from the project root:

```bash
cd demo-app
python3 -m http.server 5500
open -a "Google Chrome" http://127.0.0.1:5500/index.html
```

### Remote deployment
The workflow in `.github/workflows/deploy-demo-app.yml` publishes the static `demo-app/` directory to GitHub Pages on pushes to `main` or by manual dispatch. That deployment now includes both the teaching app and the browser smoke test page.

### Remote prerequisites
- GitHub Pages enabled for the repository.
- Actions allowed to deploy Pages.
- `origin` configured to the target GitHub repository.

## 8. Developer Console Usage

Launch the Bash console with:

```bash
bash scripts/project_console.sh
```

### Menu options
1. Save latest changes.
   Creates a safety stash, restores it, stages all changes, and commits with a timestamped snapshot message.

2. Roll back to a stable version.
   Shows a colorized, scrollable Git history table, asks for a commit hash, creates a backup branch, and resets to the chosen commit.

3. Deploy latest changes.
   Pushes the current branch to `origin` and sets upstream if needed.

4. Sync all remote branches.
   Fetches `origin`, creates missing local branches, and fast-forwards local branches to their remote versions.

## 9. Shipped UI

### Screen structure
The final app opens with a fullscreen splash video. After ten seconds, it transitions into a home gallery with featured app tiles. From there, the user can launch the AI course app or the original puzzle app inside the same shell.

### Implemented mini apps
1. Home Gallery
   A polished launcher inspired by premium app marketplaces, implemented with an original visual system and a grid of app tiles.

2. AI on the Court
   The learner navigates five lesson panels covering ideation, prompting, verification, and recap.

3. Court Grid Sprint
   The player chooses one of three shapes, places it with mouse or keyboard, clears full rows and columns, and tracks score live.

### Utility features
- Fullscreen splash video with a visible timeline bar.
- Home gallery tile layout for current and future apps.
- Shot clock with start, pause, reset, 24-second, and 14-second controls.
- Presentation mode for live teaching.
- English/French language toggle.
- Score tracking for quiz, prompt quality, and truth-check decisions.
- Direct link to the browser smoke test page from the hero area.

### Keyboard controls
- Global `L` toggles language.
- Global `F` toggles presentation mode.
- Left and right arrows switch sections.
- Space launches a random challenge.
- Enter analyzes the prompt when the prompt textarea is focused.
- `S` starts or pauses the shot clock.
- `R` resets the shot clock.
- In the puzzle app, arrows move the cursor, `1` `2` `3` select a piece, `Enter` places it, and `R` resets the round.

## 10. Recommended Next Build Steps

1. Run the browser smoke test locally and again on the GitHub Pages URL after deployment.
2. Run a full local rehearsal from `demo-app/` in Chrome before delivery.
3. Use the project console for commit, rollback, deploy, and branch maintenance.
4. Extend coverage with CI browser automation if the demo evolves further.