# v0 Clone - Complete Design System

> **Version:** 1.0.0 | **Last Updated:** 2026-02-13
> **Stack:** Next.js 15 + React 19 + Tailwind CSS 4 + shadcn/ui

---

## 📋 Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons](#icons)
7. [Animations & Micro-interactions](#animations--micro-interactions)
8. [Responsive Design](#responsive-design)
9. [Accessibility](#accessibility)
10. [Page Specifications](#page-specifications)

---

## 🎨 Brand Identity

### Brand Personality

| Attribute | Description |
|-----------|-------------|
| **Tone** | Professional, Innovative, Developer-friendly |
| **Style** | Modern, Minimal, Tech-forward |
| **Mood** | Bold, Energetic, Futuristic |
| **Voice** | Clear, Direct, Helpful |

### Target Users (User Personas)

| Persona | Description | Needs |
|---------|-------------|-------|
| **Developer** | Professional software developer | Fast code generation, clean UI, keyboard shortcuts |
| **Designer** | UI/UX designer exploring code | Visual preview, easy iteration, design-to-code |
| **Startup Founder** | Non-technical founder | Quick prototyping, easy to understand, fast results |
| **Hobbyist** | Learning to code | Guidance, suggestions, educational content |

### Brand Keywords

```
AI-powered | Code Generation | Developer Tools | Modern | Fast | Intuitive
```

---

## 🎨 Color Palette

### Primary Colors (Dark Mode Default)

| Role | Hex | OKLCH | CSS Variable | Usage |
|------|-----|-------|--------------|-------|
| **Primary** | `#1E293B` | `oklch(0.278 0.025 260)` | `--color-primary` | Headers, primary text, icons |
| **Secondary** | `#334155` | `oklch(0.345 0.025 260)` | `--color-secondary` | Secondary text, borders |
| **CTA/Accent** | `#22C55E` | `oklch(0.691 0.159 145)` | `--color-cta` | Buttons, links, success states |
| **Background** | `#0F172A` | `oklch(0.204 0.025 260)` | `--color-background` | Page background |
| **Text** | `#F8FAFC` | `oklch(0.984 0.005 260)` | `--color-text` | Primary text on dark |

### Extended Palette

| Role | Hex | Usage |
|------|-----|-------|
| **Surface** | `#1E293B` | Cards, panels, elevated surfaces |
| **Surface Hover** | `#334155` | Hover states for surfaces |
| **Border** | `rgba(255,255,255,0.1)` | Subtle borders |
| **Border Focus** | `#22C55E` | Focus rings, active states |
| **Error** | `#EF4444` | Error states, destructive actions |
| **Warning** | `#F59E0B` | Warning states |
| **Info** | `#3B82F6` | Information states |
| **Success** | `#22C55E` | Success states |

### Light Mode Palette (Optional)

| Role | Hex | Usage |
|------|-----|-------|
| **Background** | `#FFFFFF` | Page background |
| **Surface** | `#F8FAFC` | Cards, panels |
| **Text** | `#0F172A` | Primary text |
| **Text Muted** | `#64748B` | Secondary text |
| **Border** | `#E2E8F0` | Borders |

### Tailwind CSS Configuration

```css
/* app/globals.css */
@theme inline {
  --color-primary: #1E293B;
  --color-secondary: #334155;
  --color-cta: #22C55E;
  --color-background: #0F172A;
  --color-text: #F8FAFC;
  --color-surface: #1E293B;
  --color-surface-hover: #334155;
  --color-border: rgba(255,255,255,0.1);
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;
  --color-success: #22C55E;
}
```

---

## 🔤 Typography

### Font Families

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Heading** | Space Grotesk | `system-ui, sans-serif` | Headlines, titles, emphasis |
| **Body** | DM Sans | `system-ui, sans-serif` | Body text, UI elements |
| **Mono** | JetBrains Mono | `monospace` | Code blocks, technical content |

### Font Import

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-xs` | 12px | 1.5 | 400 | Captions, labels |
| `text-sm` | 14px | 1.5 | 400 | Body small, meta |
| `text-base` | 16px | 1.6 | 400 | Body text |
| `text-lg` | 18px | 1.5 | 500 | Lead text |
| `text-xl` | 20px | 1.4 | 600 | Subheadings |
| `text-2xl` | 24px | 1.3 | 600 | Section headings |
| `text-3xl` | 30px | 1.2 | 700 | Page headings |
| `text-4xl` | 36px | 1.1 | 700 | Hero headings |
| `text-5xl` | 48px | 1.0 | 700 | Display headings |

### CSS Variables

```css
:root {
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 📐 Spacing & Layout

### Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `space-0` | 0 | 0px | No spacing |
| `space-1` | 0.25rem | 4px | Tight gaps |
| `space-2` | 0.5rem | 8px | Icon gaps, inline |
| `space-3` | 0.75rem | 12px | Small padding |
| `space-4` | 1rem | 16px | Standard padding |
| `space-5` | 1.25rem | 20px | Medium padding |
| `space-6` | 1.5rem | 24px | Section padding |
| `space-8` | 2rem | 32px | Large gaps |
| `space-10` | 2.5rem | 40px | XL gaps |
| `space-12` | 3rem | 48px | Section margins |
| `space-16` | 4rem | 64px | Hero padding |
| `space-20` | 5rem | 80px | Large sections |

### Layout Grid

| Breakpoint | Container Max | Columns | Gutter |
|------------|---------------|---------|--------|
| Mobile (<640px) | 100% | 4 | 16px |
| Tablet (640-1024px) | 768px | 8 | 24px |
| Desktop (1024-1280px) | 1024px | 12 | 24px |
| Large (1280px+) | 1280px | 12 | 32px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements, tags |
| `rounded` | 6px | Buttons, inputs |
| `rounded-md` | 8px | Cards, panels |
| `rounded-lg` | 12px | Large cards, modals |
| `rounded-xl` | 16px | Hero elements |
| `rounded-2xl` | 24px | Feature cards |
| `rounded-full` | 9999px | Avatars, pills |

### Shadow Depths

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle lift |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.4)` | Cards, buttons |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.5)` | Modals, dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.6)` | Hero elements |
| `shadow-glow` | `0 0 20px rgba(34,197,94,0.3)` | CTA glow effect |

---

## 🧩 Components

### Buttons

#### Primary Button

```tsx
<button className="
  bg-cta hover:bg-cta/90 
  text-white font-semibold
  px-6 py-3 rounded-lg
  transition-all duration-200
  hover:shadow-glow
  cursor-pointer
">
  Generate Code
</button>
```

#### Secondary Button

```tsx
<button className="
  bg-transparent hover:bg-surface
  text-text border border-border
  px-6 py-3 rounded-lg
  transition-all duration-200
  cursor-pointer
">
  Cancel
</button>
```

#### Ghost Button

```tsx
<button className="
  bg-transparent hover:bg-surface/50
  text-text
  px-4 py-2 rounded-md
  transition-colors duration-200
  cursor-pointer
">
  <Icon className="w-5 h-5" />
</button>
```

### Cards

#### Standard Card

```tsx
<div className="
  bg-surface border border-border
  rounded-xl p-6
  hover:border-cta/50
  transition-all duration-200
  cursor-pointer
">
  {/* Card content */}
</div>
```

#### Glass Card (Elevated)

```tsx
<div className="
  bg-surface/80 backdrop-blur-xl
  border border-border
  rounded-2xl p-8
  shadow-xl
">
  {/* Card content */}
</div>
```

### Input Fields

#### Text Input

```tsx
<input
  type="text"
  className="
    w-full bg-background border border-border
    rounded-lg px-4 py-3
    text-text placeholder:text-muted
    focus:border-cta focus:ring-1 focus:ring-cta
    transition-colors duration-200
  "
  placeholder="Enter your prompt..."
/>
```

#### Textarea

```tsx
<textarea
  className="
    w-full bg-background border border-border
    rounded-xl px-4 py-3
    text-text placeholder:text-muted
    focus:border-cta focus:ring-1 focus:ring-cta
    resize-none min-h-[120px]
    transition-colors duration-200
  "
  placeholder="Describe what you want to build..."
/>
```

### Navigation

#### Header

```tsx
<header className="
  fixed top-0 left-0 right-0 z-50
  bg-background/80 backdrop-blur-xl
  border-b border-border
  h-16
">
  <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
    {/* Logo, Navigation, User Menu */}
  </div>
</header>
```

#### Sidebar

```tsx
<aside className="
  w-64 bg-surface border-r border-border
  flex flex-col
">
  <nav className="flex-1 p-4 space-y-2">
    {/* Navigation items */}
  </nav>
</aside>
```

### Modals/Dialogs

```tsx
<div className="
  fixed inset-0 z-50
  bg-black/50 backdrop-blur-sm
  flex items-center justify-center
">
  <div className="
    bg-surface border border-border
    rounded-2xl p-6
    max-w-lg w-full mx-4
    shadow-xl
  ">
    {/* Modal content */}
  </div>
</div>
```

---

## 🎭 Icons

### Icon Library

**Use Lucide React** (already installed in project)

```tsx
import { 
  Home, MessageSquare, Settings, User, 
  Plus, Trash, Edit, Copy, Download,
  ChevronRight, ChevronDown, Menu, X,
  Sparkles, Code, Preview, Maximize2
} from 'lucide-react'
```

### Icon Sizes

| Size | Class | Usage |
|------|-------|-------|
| Small | `w-4 h-4` | Inline, badges |
| Default | `w-5 h-5` | Buttons, navigation |
| Medium | `w-6 h-6` | Feature icons |
| Large | `w-8 h-8` | Hero icons |
| XL | `w-12 h-12` | Feature highlights |

### Icon Guidelines

- ✅ **DO:** Use SVG icons from Lucide React
- ✅ **DO:** Use consistent sizing within components
- ✅ **DO:** Include `aria-hidden="true"` for decorative icons
- ❌ **DON'T:** Use emojis as icons
- ❌ **DON'T:** Mix different icon libraries

---

## ✨ Animations & Micro-interactions

### Transition Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Fast | 150ms | `ease-out` | Hover states, buttons |
| Normal | 200ms | `ease-out` | Cards, panels |
| Slow | 300ms | `ease-in-out` | Modals, page transitions |
| Entrance | 200ms | `ease-out` | Elements entering |
| Exit | 150ms | `ease-in` | Elements leaving |

### Hover Effects

```css
/* Button hover */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 20px rgba(34,197,94,0.3);
}

/* Card hover */
.card:hover {
  border-color: rgba(34,197,94,0.5);
  transform: translateY(-2px);
}

/* Link hover */
.link:hover {
  color: #22C55E;
}
```

### Loading States

```tsx
// Skeleton loader
<div className="animate-pulse bg-surface rounded-md h-4 w-full" />

// Spinner
<svg className="animate-spin w-5 h-5 text-cta" viewBox="0 0 24 24">
  {/* spinner path */}
</svg>

// Shimmer effect
<div className="relative overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
</div>
```

### Streaming Animation

```css
/* Typing cursor */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.typing-cursor::after {
  content: '|';
  animation: blink 1s infinite;
  color: #22C55E;
}

/* Code generation effect */
@keyframes code-appear {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.code-line {
  animation: code-appear 0.3s ease-out forwards;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Breakpoints

| Name | Min Width | Max Width | Tailwind Prefix |
|------|-----------|-----------|-----------------|
| Mobile | 0px | 639px | (default) |
| SM | 640px | 767px | `sm:` |
| MD | 768px | 1023px | `md:` |
| LG | 1024px | 1279px | `lg:` |
| XL | 1280px | 1535px | `xl:` |
| 2XL | 1536px | ∞ | `2xl:` |

### Mobile-First Approach

```tsx
// Example: Responsive layout
<div className="
  flex flex-col          /* Mobile: Stack vertically */
  md:flex-row            /* Tablet+: Side by side */
  gap-4 md:gap-6         /* Responsive gap */
  p-4 md:p-6 lg:p-8      /* Responsive padding */
">
  {/* Content */}
</div>
```

### Touch Targets

- Minimum touch target: **44x44px**
- Minimum spacing between targets: **8px**

```tsx
<button className="
  min-h-[44px] min-w-[44px]
  px-4 py-3
  /* ... */
">
  Tap me
</button>
```

### Responsive Typography

```css
/* Fluid typography */
.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
}

.section-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.2;
}
```

---

## ♿ Accessibility

### Color Contrast

| Element | Minimum Ratio | Current Ratio |
|---------|---------------|---------------|
| Body text | 4.5:1 | 15.8:1 ✅ |
| Large text (18px+) | 3:1 | 12.5:1 ✅ |
| UI components | 3:1 | 5.2:1 ✅ |

### Focus States

```css
/* Visible focus ring */
:focus-visible {
  outline: 2px solid #22C55E;
  outline-offset: 2px;
}

/* Focus for buttons */
button:focus-visible {
  box-shadow: 0 0 0 2px #0F172A, 0 0 0 4px #22C55E;
}
```

### ARIA Guidelines

```tsx
// Buttons with icons
<button aria-label="Generate code">
  <Sparkles className="w-5 h-5" />
</button>

// Live regions for dynamic content
<div role="status" aria-live="polite">
  Generating response...
</div>

// Error announcements
<div role="alert" aria-live="assertive">
  Error: Please try again
</div>

// Form labels
<label htmlFor="prompt-input" className="sr-only">
  Enter your prompt
</label>
<input id="prompt-input" aria-describedby="prompt-hint" />
<p id="prompt-hint" className="text-sm text-muted">
  Describe what you want to build
</p>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift + Tab` | Move to previous focusable element |
| `Enter` | Activate button/link |
| `Escape` | Close modal/dropdown |
| `Arrow keys` | Navigate within components |

### Screen Reader Support

```tsx
// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Loading state
<div role="status" aria-busy="true">
  <span className="sr-only">Loading...</span>
  <LoadingSpinner />
</div>

// Progress indication
<div
  role="progressbar"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
>
  {/* Progress bar */}
</div>
```

---

## 📄 Page Specifications

### Home Page (Landing)

See: [`design-system/v0-clone/pages/home.md`](./pages/home.md)

### Chat Interface

See: [`design-system/v0-clone/pages/chat.md`](./pages/chat.md)

### Authentication Pages

See: [`design-system/v0-clone/pages/auth.md`](./pages/auth.md)

---

## 🚫 Anti-Patterns (Do NOT Use)

| Anti-Pattern | Reason | Solution |
|--------------|--------|----------|
| Emojis as icons | Inconsistent, accessibility issues | Use Lucide React icons |
| Missing `cursor-pointer` | Confusing UX | Add to all clickable elements |
| Layout-shifting hovers | Jarring experience | Use `transform` instead of changing dimensions |
| Low contrast text | Accessibility failure | Maintain 4.5:1 minimum |
| Instant state changes | Feels broken | Add 150-300ms transitions |
| Invisible focus states | Keyboard users can't navigate | Add visible focus rings |
| Flat design without depth | Looks unfinished | Use shadows, borders, blur |
| Text-heavy pages | Overwhelming | Break up with visuals, cards |

---

## ✅ Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] Touch targets are 44x44px minimum

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Google Fonts - DM Sans](https://fonts.google.com/specimen/DM+Sans)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This design system was generated using the ui-ux-pro-max skill.*
