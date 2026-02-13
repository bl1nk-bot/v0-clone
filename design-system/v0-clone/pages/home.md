# Home Page Design Specification

> **Page:** Home / Landing
> **Route:** `/`
> **Last Updated:** 2026-02-13

---

## 📋 Page Overview

### Purpose
The home page serves as the primary entry point for users to start generating code with AI. It should immediately communicate the product's value and provide a frictionless way to begin.

### User Goals
1. Quickly understand what the product does
2. Start generating code with minimal friction
3. Access previous chats (if authenticated)
4. Learn about features and capabilities

---

## 🎨 Visual Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Fixed, 64px)                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Logo    ChatSelector    Actions    UserNav              ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MAIN CONTENT (Centered, max-w-4xl)                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │              HERO SECTION                               ││
│  │         "What can we build together?"                   ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │              PROMPT INPUT                               ││
│  │         (Large, centered, prominent)                    ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │              SUGGESTIONS                                ││
│  │         (Horizontal scroll on mobile)                   ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER (Optional, minimal)                                 │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Header (AppHeader)

**Height:** 64px (h-16)
**Position:** Fixed top
**Background:** `bg-background/80 backdrop-blur-xl`
**Border:** `border-b border-border`

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]  [ChatSelector]    [What's This?] [GitHub] [Deploy] [User] │
└──────────────────────────────────────────────────────────────┘
```

**Responsive Behavior:**
- Mobile: Hide ChatSelector, show only UserNav + MobileMenu
- Desktop: Show all elements

#### 2. Hero Section

**Alignment:** Center
**Padding:** `py-16 md:py-24`

```tsx
<div className="text-center mb-8 md:mb-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
    What can we build together?
  </h2>
</div>
```

**Typography:**
- Font: Space Grotesk
- Size: `text-2xl` (mobile) → `text-4xl` (desktop)
- Weight: `font-bold`
- Color: `text-text` (#F8FAFC)

#### 3. Prompt Input (Primary CTA)

**Width:** `max-w-2xl mx-auto`
**Style:** Large, prominent, with glass effect

```tsx
<div className="
  bg-surface/80 backdrop-blur-xl
  border border-border
  rounded-2xl p-4
  shadow-xl
  transition-all duration-200
  focus-within:border-cta/50
">
  <textarea
    className="
      w-full bg-transparent
      text-text placeholder:text-muted
      resize-none min-h-[80px]
      focus:outline-none
    "
    placeholder="Describe what you want to build..."
  />
  
  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
    {/* Toolbar: Image upload, Voice, etc. */}
    <div className="flex items-center gap-2">
      <button className="ghost-button">
        <ImageIcon className="w-5 h-5" />
      </button>
      <button className="ghost-button">
        <MicIcon className="w-5 h-5" />
      </button>
    </div>
    
    <button className="primary-button">
      <Sparkles className="w-5 h-5 mr-2" />
      Generate
    </button>
  </div>
</div>
```

**States:**
- Default: Subtle border
- Focus: Green accent border
- Drag Over: Highlighted border, subtle glow
- Loading: Disabled with spinner

#### 4. Suggestions Section

**Layout:** Horizontal scroll on mobile, grid on desktop

```tsx
<div className="
  flex flex-wrap justify-center gap-3
  mt-8 px-4
">
  {suggestions.map((suggestion) => (
    <button
      key={suggestion.id}
      className="
        bg-surface hover:bg-surface-hover
        border border-border hover:border-cta/50
        rounded-full px-4 py-2
        text-sm text-text
        transition-all duration-200
        cursor-pointer
      "
    >
      {suggestion.text}
    </button>
  ))}
</div>
```

**Suggestion Examples:**
- "Build a landing page for a SaaS product"
- "Create a dashboard with charts"
- "Design a portfolio website"
- "Make a blog with dark mode"

---

## 🎭 Interactions

### Prompt Input Interactions

| Action | Behavior |
|--------|----------|
| Focus | Border color transitions to CTA green |
| Type | Auto-resize textarea (min 80px, max 200px) |
| Enter | Submit form (Shift+Enter for newline) |
| Drag file | Highlight border, show drop zone |
| Submit | Show loading state, transition to chat |

### Suggestion Interactions

| Action | Behavior |
|--------|----------|
| Hover | Scale up slightly (1.02), border accent |
| Click | Populate prompt input with suggestion text |

### Form Submission Flow

```
1. User types prompt
2. Clicks "Generate" or presses Enter
3. Button shows loading spinner
4. Page transitions to Chat Interface
5. User message appears in chat
6. AI response streams in
```

---

## 📱 Responsive Design

### Mobile (< 640px)

```
┌─────────────────────┐
│ [Logo]    [User][≡] │  ← Header: 64px
├─────────────────────┤
│                     │
│   "What can we      │  ← Hero: text-2xl
│    build together?" │
│                     │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Prompt Input    │ │  ← Full width, px-4
│ │                 │ │
│ │ [📷] [🎤] [✨]  │ │
│ └─────────────────┘ │
│                     │
├─────────────────────┤
│ ← Suggestion chips →│  ← Horizontal scroll
│                     │
└─────────────────────┘
```

### Tablet (640px - 1024px)

```
┌─────────────────────────────────────┐
│ [Logo] [ChatSelector]  [Actions] [User] │
├─────────────────────────────────────┤
│                                     │
│      "What can we build together?"  │  ← text-3xl
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Prompt Input (max-w-2xl)    │   │
│   └─────────────────────────────┘   │
│                                     │
│   [Suggestion] [Suggestion] [...]   │
│                                     │
└─────────────────────────────────────┘
```

### Desktop (1024px+)

```
┌───────────────────────────────────────────────────────┐
│ [Logo] [ChatSelector]  [What's This?] [GitHub] [Deploy] [User] │
├───────────────────────────────────────────────────────┤
│                                                       │
│            "What can we build together?"              │  ← text-4xl
│                                                       │
│         ┌─────────────────────────────────┐           │
│         │ Prompt Input (max-w-2xl)        │           │
│         └─────────────────────────────────┘           │
│                                                       │
│         [Suggestion] [Suggestion] [Suggestion]        │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 🎨 Color Application

| Element | Property | Value |
|---------|----------|-------|
| Page Background | `bg` | `#0F172A` |
| Header Background | `bg` | `#0F172A/80` with blur |
| Hero Text | `color` | `#F8FAFC` |
| Prompt Input Background | `bg` | `#1E293B/80` with blur |
| Prompt Input Border | `border` | `rgba(255,255,255,0.1)` |
| Prompt Input Focus Border | `border` | `#22C55E/50` |
| Generate Button | `bg` | `#22C55E` |
| Suggestion Chips | `bg` | `#1E293B` |
| Suggestion Chips Hover | `border` | `#22C55E/50` |

---

## ✅ Accessibility Checklist

- [ ] Prompt input has visible label (sr-only acceptable)
- [ ] All buttons have accessible names
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader announces suggestions
- [ ] Error states are announced

---

## 📝 Copy/Content

### Hero Headline
**Current:** "What can we build together?"
**Alternative:** "Turn your ideas into code"

### Prompt Placeholder
**Current:** "Describe what you want to build..."
**Alternative:** "Tell me what you want to create..."

### Suggestions
1. "Build a landing page for a SaaS product"
2. "Create a dashboard with charts and analytics"
3. "Design a portfolio website with dark mode"
4. "Make a blog with markdown support"
5. "Build an e-commerce product page"
6. "Create a pricing table with toggle"

---

## 🔗 Related Pages

- [Chat Interface](./chat.md) - After prompt submission
- [Authentication](./auth.md) - Login/Register modals

---

*This page specification is part of the v0 Clone Design System.*
