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

## 8. Reset to main
Only run this step if every prior step succeeded.

```
git checkout main && git pull origin main
```

Leave the user on a clean, up-to-date `main`. Do NOT create a new branch — the next session's Claude Code will read `CLAUDE.md` and branch off `main` with a name that matches the next task. If `git pull` fails (e.g., merge conflict against local main), stop and report; do not force.

After this step, remind the user: "Branch reset to `main`. Run `/clear` to start a fresh session before the next task."
