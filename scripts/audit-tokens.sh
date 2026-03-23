#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Token Audit — Finds design system violations in components
# Run: bash scripts/audit-tokens.sh
# ═══════════════════════════════════════════════════════════════

VIOLATIONS=0
SRC_DIR="src"

# Only scan .tsx and .jsx files in src/ (skip globals.css, configs, node_modules)
FILES=$(find "$SRC_DIR" -name '*.tsx' -o -name '*.jsx' 2>/dev/null)

if [ -z "$FILES" ]; then
  echo "✅ No component files found to audit."
  exit 0
fi

echo "🔍 Auditing design tokens in $SRC_DIR..."
echo ""

# ── 1. Hardcoded hex colors (should use CSS variables) ────────
COLORS=$(echo "$FILES" | xargs grep -n '#[0-9a-fA-F]\{3,8\}' 2>/dev/null | grep -v '// *audit-ignore' | grep -v 'className.*#')
if [ -n "$COLORS" ]; then
  echo "❌ HARDCODED COLORS (use --foreground, --background, etc.):"
  echo "$COLORS"
  echo ""
  VIOLATIONS=$((VIOLATIONS + $(echo "$COLORS" | wc -l)))
fi

# ── 2. Inline style attributes (should use Tailwind classes) ──
INLINE=$(echo "$FILES" | xargs grep -n 'style={{' 2>/dev/null | grep -v '// *audit-ignore')
if [ -n "$INLINE" ]; then
  echo "❌ INLINE STYLES (use Tailwind classes or type-* utilities):"
  echo "$INLINE"
  echo ""
  VIOLATIONS=$((VIOLATIONS + $(echo "$INLINE" | wc -l)))
fi

# ── 3. Hardcoded font-size in className (should use type-* utilities) ──
FONTSIZES=$(echo "$FILES" | xargs grep -n 'text-\[.*px\]' 2>/dev/null | grep -v '// *audit-ignore')
if [ -n "$FONTSIZES" ]; then
  echo "❌ HARDCODED FONT SIZES (use type-h1, type-body-m, etc.):"
  echo "$FONTSIZES"
  echo ""
  VIOLATIONS=$((VIOLATIONS + $(echo "$FONTSIZES" | wc -l)))
fi

# ── 4. Hardcoded padding/margin pixel values (should use tokens) ──
SPACING=$(echo "$FILES" | xargs grep -n 'p[xytblr]-\[.*px\]\|m[xytblr]-\[.*px\]' 2>/dev/null | grep -v '// *audit-ignore' | grep -v 'max-w-\[')
if [ -n "$SPACING" ]; then
  echo "⚠️  HARDCODED SPACING (consider using design tokens):"
  echo "$SPACING"
  echo ""
  VIOLATIONS=$((VIOLATIONS + $(echo "$SPACING" | wc -l)))
fi

# ── 5. min-width responsive prefixes (should use max-* only) ──
MINWIDTH=$(echo "$FILES" | xargs grep -n ' sm:\| md:\| lg:\| xl:\| 2xl:' 2>/dev/null | grep -v '// *audit-ignore' | grep -v 'max-')
if [ -n "$MINWIDTH" ]; then
  echo "❌ MIN-WIDTH BREAKPOINTS (use max-xl:, max-lg:, max-md: only):"
  echo "$MINWIDTH"
  echo ""
  VIOLATIONS=$((VIOLATIONS + $(echo "$MINWIDTH" | wc -l)))
fi

# ── Summary ───────────────────────────────────────────────────
if [ "$VIOLATIONS" -eq 0 ]; then
  echo "✅ No design system violations found."
else
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Found $VIOLATIONS potential violation(s)."
  echo "Add '// audit-ignore' to a line to suppress false positives."
fi

# Always exit 0 — this is informational, not blocking
exit 0
