# v0 Clone - Micro-interactions & Animations Specification

> **Version:** 1.0.0 | **Last Updated:** 2026-02-13
> **Performance Target:** 60fps on mid-range devices

---

## 📋 Table of Contents

1. [Animation Principles](#animation-principles)
2. [Timing & Easing](#timing--easing)
3. [Component Animations](#component-animations)
4. [Page Transitions](#page-transitions)
5. [Chat Animations](#chat-animations)
6. [Loading States](#loading-states)
7. [Reduced Motion](#reduced-motion)

---

## 🎯 Animation Principles

### Core Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Purposeful** | Every animation serves a purpose | No decorative animations that distract |
| **Responsive** | Animations feel instant | Duration < 300ms for UI feedback |
| **Natural** | Movement follows physics | Use ease-out for entrances, ease-in for exits |
| **Consistent** | Same patterns across the app | Use shared animation tokens |
| **Accessible** | Respect user preferences | Check `prefers-reduced-motion` |

### Animation Categories

| Category | Duration | Usage |
|----------|----------|-------|
| **Micro** | 100-150ms | Hover states, button clicks |
| **Standard** | 150-300ms | Card reveals, dropdowns |
| **Emphasis** | 300-500ms | Modals, page transitions |
| **Loading** | Continuous | Spinners, skeleton loaders |

---

## ⏱️ Timing & Easing

### Easing Functions

```css
:root {
  /* Standard easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* Decelerate - for entrances */
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);       /* Accelerate - for exits */
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);  /* Smooth - for state changes */
  
  /* Spring-like easings */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy - for playful interactions */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce effect */
  
  /* Linear for special cases */
  --ease-linear: linear;
}
```

### Duration Tokens

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
}
```

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
}
```

---

## 🧩 Component Animations

### Button Animations

#### Hover State

```css
.btn {
  transition: all var(--duration-fast) var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.btn:active {
  transform: translateY(0);
  transition-duration: 50ms;
}
```

#### Loading State

```css
.btn-loading::before {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Card Animations

#### Hover Effect

```css
.card {
  transition: all var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(34, 197, 94, 0.5);
}
```

#### Click Effect

```css
.card:active {
  transform: translateY(0);
  transition-duration: 50ms;
}
```

### Input Animations

#### Focus State

```css
.input {
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.input:focus {
  border-color: #22C55E;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}
```

#### Error Shake

```css
.input-error {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
```

### Dropdown Animations

#### Open Animation

```css
.dropdown-content {
  transform-origin: top;
  animation: dropdown-open var(--duration-normal) var(--ease-out);
}

@keyframes dropdown-open {
  from {
    opacity: 0;
    transform: scaleY(0.95) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}
```

#### Close Animation

```css
.dropdown-content[data-state="closed"] {
  animation: dropdown-close var(--duration-fast) var(--ease-in);
}

@keyframes dropdown-close {
  from {
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    transform: scaleY(0.95);
  }
}
```

### Modal Animations

#### Open Animation

```css
/* Overlay */
.modal-overlay {
  animation: fade-in var(--duration-normal) var(--ease-out);
}

/* Modal content */
.modal-content {
  animation: modal-open var(--duration-slow) var(--ease-out);
}

@keyframes modal-open {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Close Animation

```css
.modal-overlay[data-state="closed"] {
  animation: fade-out var(--duration-fast) var(--ease-in);
}

.modal-content[data-state="closed"] {
  animation: modal-close var(--duration-fast) var(--ease-in);
}

@keyframes modal-close {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

---

## 📄 Page Transitions

### Route Change Animation

```tsx
// Using Framer Motion or CSS
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const pageTransition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
}

// Usage
<motion.div
  initial="initial"
  animate="enter"
  exit="exit"
  variants={pageVariants}
  transition={pageTransition}
>
  {children}
</motion.div>
```

### Home to Chat Transition

```css
/* Home page exits up */
.home-exit {
  animation: slide-up-exit var(--duration-slow) var(--ease-in);
}

@keyframes slide-up-exit {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* Chat page enters from below */
.chat-enter {
  animation: slide-up-enter var(--duration-slow) var(--ease-out);
}

@keyframes slide-up-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 💬 Chat Animations

### Message Appearance

#### User Message

```css
.message-user {
  animation: message-slide-in-right var(--duration-normal) var(--ease-out);
}

@keyframes message-slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

#### AI Message

```css
.message-ai {
  animation: message-slide-in-left var(--duration-normal) var(--ease-out);
}

@keyframes message-slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Streaming Animation

#### Typing Cursor

```css
.typing-cursor::after {
  content: '▋';
  color: #22C55E;
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

#### Character Reveal

```css
.streaming-char {
  animation: char-appear 0.05s ease-out forwards;
}

@keyframes char-appear {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Code Block Reveal

```css
.code-line {
  opacity: 0;
  animation: code-line-appear 0.3s ease-out forwards;
}

.code-line:nth-child(1) { animation-delay: 0ms; }
.code-line:nth-child(2) { animation-delay: 30ms; }
.code-line:nth-child(3) { animation-delay: 60ms; }
/* ... continue pattern */

@keyframes code-line-appear {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Code Block Copy Animation

```css
.copy-button {
  transition: all var(--duration-fast) var(--ease-out);
}

.copy-button:active {
  transform: scale(0.95);
}

.copy-success {
  animation: copy-success 0.4s ease-out;
}

@keyframes copy-success {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

---

## ⏳ Loading States

### Spinner

```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: #22C55E;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #1E293B 0%,
    #334155 50%,
    #1E293B 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Loading Dots

```css
.loading-dots {
  display: flex;
  gap: 4px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  animation: dot-bounce 1.4s ease-in-out infinite;
}

.loading-dot:nth-child(1) { animation-delay: 0s; }
.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Progress Bar

```css
.progress-bar {
  height: 4px;
  background: #1E293B;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #22C55E;
  transition: width var(--duration-normal) var(--ease-out);
}

/* Indeterminate progress */
.progress-indeterminate {
  background: linear-gradient(
    90deg,
    transparent,
    #22C55E,
    transparent
  );
  animation: progress-slide 1.5s ease-in-out infinite;
}

@keyframes progress-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## ♿ Reduced Motion

### CSS Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Keep essential animations but make them instant */
  .spinner {
    animation: none;
    border-color: #22C55E;
  }
  
  .skeleton {
    animation: none;
    background: #1E293B;
  }
}
```

### React Implementation

```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}

// Usage
function AnimatedComponent() {
  const reducedMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```

### Framer Motion Configuration

```tsx
// lib/animation-config.ts
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const useAnimationConfig = () => {
  const reducedMotion = useReducedMotion()
  
  return {
    duration: reducedMotion ? 0 : 0.3,
    ease: [0.16, 1, 0.3, 1],
  }
}
```

---

## 📊 Animation Performance

### GPU-Accelerated Properties

Only animate these properties for 60fps performance:

| Property | Hardware Accelerated |
|----------|---------------------|
| `transform` | ✅ Yes |
| `opacity` | ✅ Yes |
| `filter` | ⚠️ Partial |
| `width/height` | ❌ No |
| `top/left/right/bottom` | ❌ No |
| `margin/padding` | ❌ No |

### Performance Best Practices

```css
/* ✅ Good - GPU accelerated */
.card {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

.card:hover {
  transform: translateY(-2px);
}

/* ❌ Bad - Causes layout thrashing */
.card-bad {
  transition: margin 0.2s ease-out;
}

.card-bad:hover {
  margin-top: -2px;
}

/* ✅ Good - will-change for complex animations */
.complex-animation {
  will-change: transform, opacity;
}

/* Clean up after animation */
.complex-animation:not(:hover) {
  will-change: auto;
}
```

### Animation Debugging

```css
/* Debug slow animations */
@media (prefers-reduced-motion: no-preference) {
  * {
    animation-duration: var(--debug-duration, initial) !important;
    transition-duration: var(--debug-duration, initial) !important;
  }
}

/* Usage in DevTools:
   document.documentElement.style.setProperty('--debug-duration', '5s')
*/
```

---

## 🎬 Animation Library

### Tailwind Animation Classes

```css
/* Add to tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.15s ease-in',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'spin-slow': 'spin 2s linear infinite',
        'pulse-fast': 'pulse 1s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
}
```

### Usage Examples

```tsx
// Fade in on mount
<div className="animate-fade-in">
  Content appears smoothly
</div>

// Slide up on hover
<button className="hover:animate-slide-up">
  Hover me
</button>

// Loading spinner
<div className="animate-spin-slow">
  <SpinnerIcon />
</div>
```

---

## 📋 Animation Checklist

Before shipping animations, verify:

- [ ] Duration is under 300ms for UI feedback
- [ ] Easing function matches the action (ease-out for entrances)
- [ ] Only GPU-accelerated properties are animated
- [ ] `prefers-reduced-motion` is respected
- [ ] Animation doesn't cause layout shifts
- [ ] Animation works on 60fps on mid-range devices
- [ ] Animation doesn't block user interaction
- [ ] Loading states provide clear feedback
- [ ] Error states have appropriate animation (shake, etc.)
- [ ] Success states have appropriate animation (checkmark, etc.)

---

*This animation specification is part of the v0 Clone Design System.*
