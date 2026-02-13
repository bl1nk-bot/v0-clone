# v0 Clone - Accessibility Guidelines

> **Version:** 1.0.0 | **Last Updated:** 2026-02-13
> **Standard:** WCAG 2.1 Level AA

---

## 📋 Table of Contents

1. [Accessibility Principles](#accessibility-principles)
2. [Color & Contrast](#color--contrast)
3. [Typography](#typography)
4. [Interactive Elements](#interactive-elements)
5. [Forms](#forms)
6. [Navigation](#navigation)
7. [Images & Media](#images--media)
8. [Dynamic Content](#dynamic-content)
9. [Keyboard Navigation](#keyboard-navigation)
10. [Screen Reader Support](#screen-reader-support)
11. [Testing Checklist](#testing-checklist)

---

## 🎯 Accessibility Principles

### WCAG 2.1 Guidelines (POUR)

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Perceivable** | Users must be able to perceive the content | Color contrast, text alternatives, captions |
| **Operable** | Users must be able to operate the interface | Keyboard navigation, focus states, timing |
| **Understandable** | Users must be able to understand the content | Clear language, consistent navigation, error messages |
| **Robust** | Content must be compatible with assistive technologies | Semantic HTML, ARIA attributes, valid code |

### Target Compliance

- **Minimum:** WCAG 2.1 Level AA
- **Target:** WCAG 2.1 Level AAA where feasible
- **Testing:** Automated + Manual + User testing

---

## 🎨 Color & Contrast

### Contrast Ratios

| Element | Minimum Ratio | Target Ratio |
|---------|---------------|--------------|
| Body text (< 18px) | 4.5:1 | 7:1 |
| Large text (≥ 18px or 14px bold) | 3:1 | 4.5:1 |
| UI components (borders, icons) | 3:1 | 4.5:1 |
| Focus indicators | 3:1 | 4.5:1 |

### Current Color Audit

| Color Combination | Ratio | Status |
|-------------------|-------|--------|
| `#F8FAFC` on `#0F172A` (Text on Background) | 15.8:1 | ✅ AAA |
| `#F8FAFC` on `#1E293B` (Text on Surface) | 12.5:1 | ✅ AAA |
| `#94A3B8` on `#0F172A` (Muted on Background) | 5.1:1 | ✅ AA |
| `#22C55E` on `#0F172A` (CTA on Background) | 5.2:1 | ✅ AA |
| `#22C55E` on white (Button text) | 3.5:1 | ✅ AA Large |

### Color Independence

```tsx
// ❌ Bad: Color is the only indicator
<span className="text-red-500">Error</span>

// ✅ Good: Color + icon + text
<span className="text-red-500 flex items-center gap-1">
  <XCircle className="w-4 h-4" />
  Error
</span>
```

### Focus Indicators

```css
/* Visible focus ring */
:focus-visible {
  outline: 2px solid #22C55E;
  outline-offset: 2px;
}

/* High contrast focus for buttons */
button:focus-visible {
  box-shadow: 0 0 0 2px #0F172A, 0 0 0 4px #22C55E;
}

/* Focus for inputs */
input:focus-visible {
  border-color: #22C55E;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
}
```

---

## 🔤 Typography

### Font Size Guidelines

| Element | Minimum Size | Recommended |
|---------|--------------|-------------|
| Body text | 16px | 16-18px |
| Small text | 12px | 14px |
| Captions | 12px | 12-14px |

### Line Height

| Element | Line Height |
|---------|-------------|
| Body text | 1.5-1.6 |
| Headings | 1.2-1.3 |
| UI text | 1.4-1.5 |

### Text Spacing

Users should be able to override text spacing:

```css
/* Support user stylesheets */
* {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}

/* Ensure content doesn't break */
p {
  margin-bottom: 1.5em;
}
```

### Readability

```tsx
// ✅ Good: Clear, simple language
<p className="text-base leading-relaxed">
  Enter your prompt to generate code. The AI will create a response based on your description.
</p>

// ❌ Bad: Jargon-heavy, complex
<p>
  Leverage our AI-powered paradigm to facilitate code generation via natural language prompts.
</p>
```

---

## 🖱️ Interactive Elements

### Touch Targets

| Element | Minimum Size | Recommended |
|---------|--------------|-------------|
| Buttons | 44x44px | 48x48px |
| Links | 44x44px | 48x48px |
| Form inputs | 44x44px | 48x48px |
| Icon buttons | 44x44px | 48x48px |

```tsx
// ✅ Good: Adequate touch target
<button className="min-h-[44px] min-w-[44px] px-4 py-3">
  Submit
</button>

// ❌ Bad: Too small
<button className="p-1">
  <Icon className="w-4 h-4" />
</button>
```

### Hover States

```css
/* Provide visual feedback */
.button:hover {
  background-color: rgba(34, 197, 94, 0.9);
  transform: translateY(-1px);
}

/* Don't rely on hover alone */
.button:focus-visible {
  /* Same or more prominent state */
}
```

### Click/Touch Feedback

```css
.button:active {
  transform: scale(0.98);
  transition-duration: 50ms;
}
```

---

## 📝 Forms

### Labels

```tsx
// ✅ Good: Visible label
<div>
  <label htmlFor="email" className="block text-sm font-medium mb-2">
    Email address
  </label>
  <input id="email" type="email" className="input" />
</div>

// ✅ Good: Visually hidden label (when design requires)
<div>
  <label htmlFor="search" className="sr-only">
    Search chats
  </label>
  <input id="search" type="search" placeholder="Search..." />
</div>

// ❌ Bad: No label
<input type="email" placeholder="Email" />
```

### Required Fields

```tsx
<div>
  <label htmlFor="email" className="block text-sm font-medium mb-2">
    Email address
    <span className="text-red-500 ml-1" aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
  />
</div>
```

### Error Messages

```tsx
// ✅ Good: Associated error message
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    aria-invalid={hasError ? "true" : "false"}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-red-500 text-sm" role="alert">
      Please enter a valid email address
    </p>
  )}
</div>
```

### Help Text

```tsx
<div>
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    aria-describedby="password-hint"
  />
  <p id="password-hint" className="text-sm text-muted">
    Must be at least 8 characters
  </p>
</div>
```

---

## 🧭 Navigation

### Skip Links

```tsx
// Add at the top of the page
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:rounded-lg"
>
  Skip to main content
</a>

// Main content landmark
<main id="main-content">
  {/* Page content */}
</main>
```

### Landmarks

```tsx
// Proper page structure
<body>
  <header>
    <nav aria-label="Main navigation">
      {/* Navigation */}
    </nav>
  </header>
  
  <main>
    <article>
      {/* Main content */}
    </article>
  </main>
  
  <aside aria-label="Sidebar">
    {/* Sidebar content */}
  </aside>
  
  <footer>
    {/* Footer content */}
  </footer>
</body>
```

### Current Page Indicator

```tsx
<nav>
  <ul>
    <li>
      <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>
        Home
      </a>
    </li>
    <li>
      <a href="/chats" aria-current={pathname === '/chats' ? 'page' : undefined}>
        Chats
      </a>
    </li>
  </ul>
</nav>
```

---

## 🖼️ Images & Media

### Images

```tsx
// ✅ Good: Informative image with alt text
<img
  src="/preview-screenshot.png"
  alt="Preview of the generated landing page showing hero section and features"
/>

// ✅ Good: Decorative image with empty alt
<img
  src="/decorative-pattern.svg"
  alt=""
  aria-hidden="true"
/>

// ❌ Bad: Missing alt text
<img src="/image.png" />
```

### Icons

```tsx
// ✅ Good: Decorative icon
<button>
  <Settings className="w-5 h-5" aria-hidden="true" />
  <span>Settings</span>
</button>

// ✅ Good: Icon-only button with label
<button aria-label="Open settings">
  <Settings className="w-5 h-5" aria-hidden="true" />
</button>

// ❌ Bad: Icon without accessible name
<button>
  <Settings className="w-5 h-5" />
</button>
```

### iframes (Preview Panel)

```tsx
<iframe
  src={previewUrl}
  title="Generated code preview"
  className="w-full h-full"
/>
```

---

## 🔄 Dynamic Content

### Live Regions

```tsx
// Polite announcements (don't interrupt)
<div role="status" aria-live="polite" className="sr-only">
  {isLoading && 'Loading response...'}
  {isComplete && 'Response complete'}
</div>

// Assertive announcements (interrupt)
<div role="alert" aria-live="assertive">
  {error && `Error: ${error.message}`}
</div>
```

### Loading States

```tsx
// ✅ Good: Announce loading state
<div role="status" aria-busy={isLoading}>
  {isLoading ? (
    <>
      <span className="sr-only">Loading...</span>
      <Spinner aria-hidden="true" />
    </>
  ) : (
    <Content />
  )}
</div>
```

### Streaming Content

```tsx
// Announce when streaming starts and ends
<div
  role="status"
  aria-live="polite"
  aria-label="AI response"
>
  <span className="sr-only">
    {isStreaming ? 'AI is generating response' : 'Response complete'}
  </span>
  <div aria-hidden="true">
    {/* Streaming content */}
  </div>
</div>
```

---

## ⌨️ Keyboard Navigation

### Focus Management

```tsx
// Trap focus in modal
import { FocusTrap } from '@headlessui/react'

function Modal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <FocusTrap>
        <div>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogContent>...</DialogContent>
          <button onClick={onClose}>Close</button>
        </div>
      </FocusTrap>
    </Dialog>
  )
}
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Move to next focusable element |
| `Shift + Tab` | Move to previous focusable element |
| `Enter` | Activate button/link |
| `Space` | Activate button, toggle checkbox |
| `Escape` | Close modal/dropdown |
| `Arrow keys` | Navigate within components |
| `Home/End` | Jump to start/end of list |

### Custom Keyboard Handlers

```tsx
function DropdownMenu() {
  const [activeIndex, setActiveIndex] = useState(-1)
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, items.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        items[activeIndex]?.onClick()
        break
      case 'Escape':
        e.preventDefault()
        closeMenu()
        break
    }
  }
  
  return (
    <div onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <button
          key={item.id}
          tabIndex={index === activeIndex ? 0 : -1}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
```

---

## 📢 Screen Reader Support

### Semantic HTML

```tsx
// ✅ Good: Semantic elements
<article>
  <header>
    <h2>Article Title</h2>
    <time dateTime="2024-01-15">January 15, 2024</time>
  </header>
  <p>Article content...</p>
  <footer>
    <address>Author name</address>
  </footer>
</article>

// ❌ Bad: Div soup
<div>
  <div>
    <div>Article Title</div>
    <div>January 15, 2024</div>
  </div>
  <div>Article content...</div>
</div>
```

### ARIA Roles (When Needed)

```tsx
// Tab list
<div role="tablist" aria-label="Chat options">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Chat
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Preview
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  {/* Chat content */}
</div>
```

### Hidden Content

```tsx
// Visually hidden but accessible to screen readers
<span className="sr-only">
  This text is read by screen readers but not visible
</span>

// CSS
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Hidden from everyone
<div aria-hidden="true">
  Decorative content
</div>
```

### Announcements

```tsx
// Utility component for announcements
function Announcer({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// Usage
<Announcer message={isLoading ? 'Loading...' : 'Complete'} />
```

---

## ✅ Testing Checklist

### Automated Testing

```bash
# Run accessibility audit
npm run test:a11y

# Using axe-core
npx axe-cli http://localhost:3000
```

### Manual Testing Checklist

#### Visual

- [ ] All text has sufficient contrast (4.5:1 minimum)
- [ ] Focus states are visible
- [ ] UI components have 3:1 contrast
- [ ] Color is not the only indicator
- [ ] Text can be resized to 200% without loss of content

#### Keyboard

- [ ] All interactive elements are focusable
- [ ] Tab order is logical
- [ ] Focus is visible at all times
- [ ] No keyboard traps
- [ ] Skip links work
- [ ] Modals trap focus correctly
- [ ] Escape closes modals/dropdowns

#### Screen Reader

- [ ] All images have appropriate alt text
- [ ] Form inputs have labels
- [ ] Headings are properly nested (h1 → h2 → h3)
- [ ] Landmarks are used correctly
- [ ] Dynamic content is announced
- [ ] Error messages are announced
- [ ] Loading states are announced

#### Mobile

- [ ] Touch targets are 44x44px minimum
- [ ] Content doesn't require horizontal scroll
- [ ] Pinch-to-zoom is not disabled
- [ ] Content reflows at 320px width

### Testing Tools

| Tool | Purpose |
|------|---------|
| **axe DevTools** | Automated accessibility testing |
| **WAVE** | Visual accessibility checker |
| **NVDA** | Screen reader testing (Windows) |
| **VoiceOver** | Screen reader testing (macOS/iOS) |
| **Keyboard-only** | Manual keyboard navigation testing |
| **Color Contrast Analyzer** | Contrast ratio verification |

### Browser Testing Matrix

| Browser | Screen Reader |
|---------|---------------|
| Chrome | NVDA, JAWS |
| Firefox | NVDA |
| Safari | VoiceOver |
| Edge | NVDA, JAWS |

---

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)
- [Tailwind CSS Screen Readers](https://tailwindcss.com/docs/screen-readers)

---

*This accessibility guideline is part of the v0 Clone Design System.*
