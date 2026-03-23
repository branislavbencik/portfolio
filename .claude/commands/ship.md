---
description: Build, commit, push, and update STATUS.md. Use after completing a deliverable.
allowed-tools: Bash(npm run build:*), Bash(git:*), Read, Edit, Write
---

# Ship — Build, Commit, Push, Update Status

Follow these steps in order. Stop and report if any step fails.

## 1. Build
Run `npm run build`. If it fails, fix the errors first. Do not proceed until build passes.

## 2. Stage all changes
Run `git add -A`. This catches images and binary files that selective staging misses.

## 3. Commit
Write a concise conventional commit message describing what was done this session. Commit.

## 4. Push
Run `git push`.

## 5. Update STATUS.md
Open `docs/STATUS.md`
Add a one-line session log entry with today's date and what was completed.
Update the "What's done" and "What's next" fields.

## 6. Commit and push the STATUS.md update
```
git add docs/STATUS.md && git commit -m "docs: update STATUS.md" && git push
```

Report what was committed and the Vercel deploy URL.
