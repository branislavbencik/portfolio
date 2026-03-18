// Design tokens extracted from Figma on March 18, 2026
// Drop this into your tailwind.config.ts theme.extend section
// or paste into globals.css as @theme overrides

// === TYPOGRAPHY ===
// Font: Geist Sans (already configured by create-next-app)
// Font: Geist Mono (already configured by create-next-app)
//
// H1:          64px, SemiBold (600), line-height: 100%, letter-spacing: -0.04em
// H2:          40px, SemiBold (600), line-height: 110%, letter-spacing: -0.04em
// H3:          32px, SemiBold (600), line-height: 120%, letter-spacing: -0.02em
// H4:          27px, SemiBold (600), line-height: 120%, letter-spacing: -0.02em
// Subheadline: 20px, SemiBold (600), line-height: 120%, letter-spacing: 0
// Body XL:     20px, Regular  (400), line-height: 150%, letter-spacing: 0
// Body L:      18px, Regular  (400), line-height: 150%, letter-spacing: 0
// Body M:      16px, Regular  (400), line-height: 150%, letter-spacing: 0
// Body S:      14px, Regular  (400), line-height: 150%, letter-spacing: 0
// AllCaps:     14px, Medium   (500), line-height: 140%, letter-spacing: 0.05em
// Mono:        14px, Regular  (400), line-height: 140%, letter-spacing: 0 (Geist Mono)
// Button:      16px, SemiBold (600), line-height: 140%, letter-spacing: 0

// === COLORS ===
// Background:       #ffffff
// Text:             #171717
// Impact bar bg:    #0a0a0a
// Impact bar text:  #ffffff (inferred)

// === LAYOUT ===
// Frame max-width:       1288px
// Content max-width:     1128px (frame minus 80px padding each side)
// Horizontal padding:    80px (5rem)
// Section vertical pad:  100px (6.25rem)
// Nav vertical pad:      20px (1.25rem)
// Case study card gap:   48px (3rem)
// Selected project grid: 2 columns, 12px gap (0.75rem)
// Card internal gap:     8px (0.5rem)

// === TAILWIND CONFIG ===
// Paste into tailwind.config.ts → theme.extend

const figmaTokens = {
  maxWidth: {
    'frame': '1288px',
    'content': '1128px',
  },
  padding: {
    'section-x': '80px',     // horizontal padding for sections
    'section-y': '100px',    // vertical padding for sections
    'nav-y': '20px',         // nav vertical padding
  },
  gap: {
    'card': '48px',           // between case study cards
    'grid': '12px',           // between selected project columns
    'card-inner': '8px',      // inside selected project cards
  },
  fontSize: {
    'h1': ['64px', { lineHeight: '100%', letterSpacing: '-0.04em', fontWeight: '600' }],
    'h2': ['40px', { lineHeight: '110%', letterSpacing: '-0.04em', fontWeight: '600' }],
    'h3': ['32px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '600' }],
    'h4': ['27px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '600' }],
    'subheadline': ['20px', { lineHeight: '120%', letterSpacing: '0', fontWeight: '600' }],
    'body-xl': ['20px', { lineHeight: '150%', letterSpacing: '0', fontWeight: '400' }],
    'body-l': ['18px', { lineHeight: '150%', letterSpacing: '0', fontWeight: '400' }],
    'body-m': ['16px', { lineHeight: '150%', letterSpacing: '0', fontWeight: '400' }],
    'body-s': ['14px', { lineHeight: '150%', letterSpacing: '0', fontWeight: '400' }],
    'allcaps': ['14px', { lineHeight: '140%', letterSpacing: '0.05em', fontWeight: '500' }],
    'mono': ['14px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' }],
    'button': ['16px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '600' }],
  },
  colors: {
    'surface': '#ffffff',
    'text': '#171717',
    'dark': '#0a0a0a',
  },
}

export default figmaTokens;
