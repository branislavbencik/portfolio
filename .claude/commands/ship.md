---
description: Build, verify README, commit, push, update STATUS.md, and open a pull request. Use after completing a deliverable.
allowed-tools: Bash(npm run build:*), Bash(git:*), Bash(gh:*), Read, Edit, Write
---

# Ship — Build, Commit, Push, Update Status, Open PR

Follow these steps in order. Stop and report if any step fails.

## 0. Branch state pre-flight
Before doing anything, check whether the current branch is in a shippable state:

1. `git branch --show-current` — if it's `main`, STOP. Ship must run from a feature branch. Tell the user to create one.
2. `gh pr list --head "$(git branch --show-current)" --state all --json number,state,title --limit 1` — inspect the latest PR for this branch.
   - If the latest PR is `MERGED` or `CLOSED`, STOP. The branch is stale. Report the PR number + state and tell the user: "This branch's PR is already `MERGED`/`CLOSED`. Start a new session (`/clear`) and a new branch off `main` before shipping new work."
   - If the latest PR is `OPEN`, continue — new commits will append to that PR.
   - If there is no PR yet, continue — a new PR will be created at step 7.

Do NOT auto-create or auto-checkout a new branch. The user must start a fresh session to reset Claude's context; silently branching here would strand uncommitted work and confuse the next session.

## 0.5 Worktree detection
Run `git rev-parse --git-dir`. If the output contains `.git/worktrees/`, you are inside a git worktree. Remember this for step 8. Do NOT try to checkout `main` inside a worktree — it will fail with "already checked out" because the root checkout has `main`.

## 0.75 Docs-consistency preflight

Before building, check whether this session's UI changes have drifted from the source-of-truth docs. The rule (CLAUDE.md → §Source-of-Truth Hierarchy, Docs-consistency rule): *if UI work deviates from `positioning.md` / `docs/DESIGN.md`, update the docs in the SAME session and confirm with the user before shipping.*

Perform this check even if you didn't write the original positioning docs yourself — the deviation might have been introduced by this session's code changes.

1. **Inventory session UI changes.** Run `git diff main...HEAD --name-only -- 'src/**/*.tsx' 'src/**/*.ts' 'src/app/globals.css' 'src/content/**/*.yaml' 'src/content/**/*.mdx'`. Anything listed is potentially strategic-visible work.
2. **Cross-check against the docs.** For each changed file, ask: does this session alter any of the following?
   - Hero copy / hero typography / kicker → `positioning.md` → §Hero
   - Landing grid layout / card wrapper / hover behavior / reveal panel → `positioning.md` → §Landing grid + `docs/DESIGN.md` → §Case Study Cards
   - Typography scale (new size / weight / new role) → `docs/DESIGN.md` → §3 Typography Scale
   - Color tokens / palette / new semantic color → `docs/DESIGN.md` → §2 Color Tokens
   - Spacing scale / container widths → `docs/DESIGN.md` → §5 Spacing & Rhythm + `positioning.md` → §Visual constraints
   - Proof stack composition (case study added / removed / reclassified) → `positioning.md` → §Proof stack
   - Em-dash, chip styling, or any rule in DESIGN.md §6 Execution Rules
3. **Decision.** For each drift found:
   - If the docs are already updated this session, note "docs aligned" and proceed.
   - If the docs are NOT yet updated, STOP. Report the drift to the user using this exact format: *"Session shipped a change in `<file>` that deviates from `<doc>` → `<section>`. Options: (a) update the doc to match the code, (b) revert the code to match the doc, (c) accept the deviation as intentional and I'll note it but not update the doc. Your call."* Wait for the answer. Execute it. Only then continue to step 1.

Skip this step only for sessions that are explicitly docs-only (no files under `src/` modified) or infra-only (config files, `.claude/` skills, memory updates). In those cases, note "No UI changes; docs-consistency preflight not applicable" and continue.

## 1. Build
Run `npm run build`. If it fails, fix the errors first. Do not proceed until build passes.

## 1.5 README drift check
Read `README.md` in full. Compare every factual claim against the current repo state:
- Stack versions and dependencies → `package.json`
- Scripts and commands → `package.json` scripts block
- Pages / routes listed → `src/app/` + `docs/STATUS.md` Pages line
- Repo map paths → verify each referenced directory still exists
- Workflow claims (e.g. `/ship`, audit scripts) → verify the referenced files

If any claim is stale, wrong, or missing (e.g. a new page shipped this session, a dependency was added/removed, a script was renamed), update `README.md` in place before proceeding. Do NOT rewrite the tone or structure — only fix factual drift. If nothing is stale, note "README verified" and continue.

## 2. Stage all changes
Run `git add -A`. This catches images and binary files that selective staging misses.

## 3. Commit
Write a concise conventional commit message describing what was done this session. Commit.

## 4. Push
Run `git push -u origin HEAD`. This sets the upstream on first push of a new branch and is idempotent on subsequent pushes.

## 5. Update STATUS.md
Open `docs/STATUS.md`
Add a one-line session log entry with today's date and what was completed.
Update the "What's done" and "What's next" fields.

## 6. Commit and push the STATUS.md update
```
git add docs/STATUS.md && git commit -m "docs: update STATUS.md" && git push
```

## 7. Open pull request
Create a pull request against `main` using the GitHub CLI. Do NOT merge it — the user reviews and approves.

Compose the title (under 70 chars) and body from the session's commits. The body must include a `## Summary` section with 1–3 bullets and a `## Test plan` checklist.

```
gh pr create --base main --head "$(git branch --show-current)" \
  --title "<concise title under 70 chars>" \
  --body "$(cat <<'EOF'
## Summary
<1-3 bullet points describing the session's work>

## Test plan
- [ ] <user-facing verification steps>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Report the PR URL and the Vercel deploy URL. Do NOT run `gh pr merge` — the user approves the merge.

## 8. Cleanup guidance (worktree-aware)
Only run this step if every prior step succeeded.

**If you detected a worktree in step 0.5:**
- Do NOT run `git checkout main` — it will fail because the root checkout already has `main`.
- Tell the user: "PR opened. Exit this Claude session when you're done. After the PR merges, clean up the worktree with `git worktree remove .claude/worktrees/<branch>` from the repo root (`~/repos/portfolio`). To start the next task, run `cc <new-branch>` in a fresh terminal."

**If you are NOT in a worktree (classic flow):**

```
git checkout main && git pull origin main
```

Leave the user on a clean, up-to-date `main`. Do NOT create a new branch — the next session's Claude Code will read `CLAUDE.md` and branch off `main` with a name that matches the next task. If `git pull` fails (e.g., merge conflict against local main), stop and report; do not force.

After this step, remind the user: "Branch reset to `main`. Run `/clear` to start a fresh session before the next task."
