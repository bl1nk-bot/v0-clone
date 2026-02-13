# v0 Clone Design System

> **Version:** 1.0.0 | **Created:** 2026-02-13
> **Stack:** Next.js 15 + React 19 + Tailwind CSS 4 + shadcn/ui

---

## 📁 File Structure

```
design-system/v0-clone/
├── README.md           # This file - Overview and navigation
├── MASTER.md           # Global design rules (auto-generated)
├── DESIGN-SYSTEM.md    # Complete design system documentation
├── COMPONENTS.md       # Component library specifications
├── MOCKUPS.md          # Wireframes and mockups
├── ANIMATIONS.md       # Micro-interactions and animations
├── ACCESSIBILITY.md    # Accessibility guidelines
└── pages/
    ├── home.md         # Home page design specification
    ├── chat.md         # Chat interface design specification
    └── auth.md         # Authentication pages design specification
```

---

## 🎨 Quick Reference

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#1E293B` | Headers, primary text |
| Secondary | `#334155` | Secondary text, borders |
| CTA/Accent | `#22C55E` | Buttons, links, success |
| Background | `#0F172A` | Page background |
| Text | `#F8FAFC` | Primary text on dark |

### Typography

| Role | Font | Usage |
|------|------|-------|
| Heading | Space Grotesk | Headlines, titles |
| Body | DM Sans | Body text, UI |
| Mono | JetBrains Mono | Code blocks |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Icon gaps |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Large gaps |

---

## 📚 Documentation Guide

### For Developers

1. **Start with:** [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md)
   - Complete design tokens
   - Color palette with CSS variables
   - Typography scale
   - Spacing and layout

2. **Implement components:** [`COMPONENTS.md`](./COMPONENTS.md)
   - Button variants
   - Input components
   - Card components
   - Navigation components
   - Chat components

3. **Add animations:** [`ANIMATIONS.md`](./ANIMATIONS.md)
   - Timing and easing
   - Component animations
   - Loading states
   - Reduced motion support

### For Designers

1. **Review mockups:** [`MOCKUPS.md`](./MOCKUPS.md)
   - ASCII wireframes for all breakpoints
   - Component mockups
   - Responsive layouts

2. **Check page specs:**
   - [`pages/home.md`](./pages/home.md) - Landing page
   - [`pages/chat.md`](./pages/chat.md) - Chat interface
   - [`pages/auth.md`](./pages/auth.md) - Login/Register

### For QA

1. **Accessibility testing:** [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)
   - WCAG 2.1 compliance checklist
   - Color contrast requirements
   - Keyboard navigation
   - Screen reader support

---

## 🚀 Getting Started

### 1. Install Fonts

Add Google Fonts to your layout:

```tsx
// app/layout.tsx
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})
```

### 2. Update CSS Variables

```css
/* app/globals.css */
@theme inline {
  --color-primary: #1E293B;
  --color-secondary: #334155;
  --color-cta: #22C55E;
  --color-background: #0F172A;
  --color-text: #F8FAFC;
  --color-surface: #1E293B;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-error: #EF4444;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;
  --color-muted: #94A3B8;
}
```

### 3. Use Design Tokens

```tsx
// Button example
<button className="
  bg-cta hover:bg-cta/90
  text-white font-semibold
  px-6 py-3 rounded-lg
  transition-all duration-200
  cursor-pointer
">
  Generate Code
</button>

// Card example
<div className="
  bg-surface border border-border
  rounded-xl p-6
  hover:border-cta/50
  transition-all duration-200
">
  {/* Content */}
</div>
```

---

## ✅ Pre-Delivery Checklist

Before shipping, verify:

- [ ] No emojis used as icons (use Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Focus states visible for keyboard navigation
- [ ] Text contrast 4.5:1 minimum
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Touch targets 44x44px minimum

---

## 🔗 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Google Fonts](https://fonts.google.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📝 Changelog

### v1.0.0 (2026-02-13)
- Initial design system creation
- Complete color palette and typography
- Component library specifications
- Page-specific design specs
- Wireframes and mockups
- Animation guidelines
- Accessibility guidelines

---

*This design system was created using the ui-ux-pro-max skill.*
