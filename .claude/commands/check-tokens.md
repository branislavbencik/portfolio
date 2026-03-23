---
description: Audit components for hardcoded colors, font sizes, and inline styles that should use design tokens.
allowed-tools: Bash(grep:*), Bash(find:*), Read
---

# Check Tokens — Audit for Design System Violations

Run `bash scripts/audit-tokens.sh` and report the results.

If violations are found:
1. List each violation with file, line number, and the offending value
2. Suggest the correct design token or Tailwind utility to use instead
3. Ask if I want you to fix them

Do NOT fix anything automatically. Just report.
