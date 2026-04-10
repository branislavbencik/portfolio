---
description: Build, commit, push, update STATUS.md, and open a pull request. Use after completing a deliverable.
allowed-tools: Bash(npm run build:*), Bash(git:*), Bash(gh:*), Read, Edit, Write
---

# Ship — Build, Commit, Push, Update Status, Open PR

Follow these steps in order. Stop and report if any step fails.

## 1. Build
Run `npm run build`. If it fails, fix the errors first. Do not proceed until build passes.

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
