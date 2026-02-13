# Authentication Pages Design Specification

> **Pages:** Login, Register
> **Routes:** `/login`, `/register`
> **Last Updated:** 2026-02-13

---

## 📋 Page Overview

### Purpose
Authentication pages allow users to create accounts and log in to access persistent chat history and higher rate limits.

### User Goals
1. Create a new account quickly
2. Log in to existing account
3. Continue as guest (optional)
4. Understand the benefits of authentication

---

## 🎨 Visual Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    CENTERED CARD                            │
│                    (max-w-md)                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  LOGO                                               │   │
│  │                                                     │   │
│  │  HEADING                                            │   │
│  │  "Welcome back" or "Create account"                 │   │
│  │                                                     │   │
│  │  ─────────────────────────────────                  │   │
│  │                                                     │   │
│  │  FORM                                               │   │
│  │  • Email input                                      │   │
│  │  • Password input                                   │   │
│  │  • (Confirm password for register)                  │   │
│  │  • Submit button                                    │   │
│  │                                                     │   │
│  │  ─────────────────────────────────                  │   │
│  │                                                     │   │
│  │  SECONDARY ACTIONS                                  │   │
│  │  "Don't have an account? Sign up"                   │   │
│  │  "Continue as guest"                                │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Login Page

### Component Structure

```tsx
export default function LoginPage() {
  return (
    <div className="
      min-h-screen
      bg-background
      flex items-center justify-center
      px-4 py-12
    ">
      <div className="
        w-full max-w-md
        bg-surface/80 backdrop-blur-xl
        border border-border
        rounded-2xl
        p-8
        shadow-xl
      ">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-text">
              v0 Clone
            </h1>
          </Link>
        </div>
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-text">
            Welcome back
          </h2>
          <p className="text-sm text-muted mt-1">
            Sign in to your account to continue
          </p>
        </div>
        
        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          
          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span className="text-sm text-muted">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-cta hover:underline">
              Forgot password?
            </Link>
          </div>
          
          {/* Submit */}
          <button type="submit" className="w-full btn-primary">
            Sign in
          </button>
        </form>
        
        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-muted">or</span>
          </div>
        </div>
        
        {/* Guest Access */}
        <button className="w-full btn-secondary">
          Continue as guest
        </button>
        
        {/* Sign up link */}
        <p className="text-center text-sm text-muted mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-cta hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
```

---

## 📝 Register Page

### Component Structure

```tsx
export default function RegisterPage() {
  return (
    <div className="
      min-h-screen
      bg-background
      flex items-center justify-center
      px-4 py-12
    ">
      <div className="
        w-full max-w-md
        bg-surface/80 backdrop-blur-xl
        border border-border
        rounded-2xl
        p-8
        shadow-xl
      ">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-text">
              v0 Clone
            </h1>
          </Link>
        </div>
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-text">
            Create account
          </h2>
          <p className="text-sm text-muted mt-1">
            Get started with your free account
          </p>
        </div>
        
        {/* Benefits */}
        <div className="bg-cta/10 border border-cta/20 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-text mb-2">
            With an account you get:
          </h3>
          <ul className="text-sm text-muted space-y-1">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cta" />
              50 chats per day (vs 3 for anonymous)
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cta" />
              Persistent chat history
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cta" />
              Access from any device
            </li>
          </ul>
        </div>
        
        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              helperText="At least 8 characters"
              required
            />
          </div>
          
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-2">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          
          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" className="checkbox mt-1" required />
            <span className="text-sm text-muted">
              I agree to the{' '}
              <Link href="/terms" className="text-cta hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-cta hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          
          {/* Submit */}
          <button type="submit" className="w-full btn-primary">
            Create account
          </button>
        </form>
        
        {/* Sign in link */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cta hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
```

---

## 🧩 Form Components

### Input Field

```tsx
<input
  className="
    w-full
    bg-background
    border border-border
    rounded-lg
    px-4 py-3
    text-text
    placeholder:text-muted
    focus:border-cta focus:ring-1 focus:ring-cta
    transition-colors duration-200
  "
/>
```

### Checkbox

```tsx
<input
  type="checkbox"
  className="
    w-4 h-4
    rounded
    border-border
    bg-background
    text-cta
    focus:ring-cta focus:ring-offset-0
    cursor-pointer
  "
/>
```

### Error State

```tsx
<div className="space-y-1">
  <input
    className="
      w-full
      bg-background
      border border-error
      rounded-lg
      px-4 py-3
      text-text
      focus:ring-1 focus:ring-error
    "
  />
  <p className="text-sm text-error" role="alert">
    Please enter a valid email address
  </p>
</div>
```

### Success State

```tsx
<div className="relative">
  <input
    className="
      w-full
      bg-background
      border border-success
      rounded-lg
      px-4 py-3
      text-text
      pr-10
    "
  />
  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
</div>
```

---

## 🎭 Interactions

### Form Validation

| Field | Validation | Error Message |
|-------|------------|---------------|
| Email | Valid email format | "Please enter a valid email address" |
| Password | Min 8 characters | "Password must be at least 8 characters" |
| Confirm Password | Matches password | "Passwords do not match" |

### Loading States

```tsx
<button
  type="submit"
  disabled={isLoading}
  className="
    w-full
    bg-cta hover:bg-cta/90
    disabled:opacity-50 disabled:cursor-not-allowed
    text-white font-semibold
    py-3 rounded-lg
    transition-all duration-200
    cursor-pointer
  "
>
  {isLoading ? (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="w-5 h-5 animate-spin" />
      Signing in...
    </span>
  ) : (
    'Sign in'
  )}
</button>
```

### Success Flow

```
1. User submits form
2. Button shows loading state
3. API processes request
4. On success: Redirect to home
5. On error: Show error message
```

---

## 📱 Responsive Design

### Mobile (< 640px)

```
┌─────────────────────┐
│                     │
│   ┌───────────────┐ │
│   │    v0 Clone   │ │
│   │               │ │
│   │ Welcome back  │ │
│   │               │ │
│   │ ┌───────────┐ │ │
│   │ │ Email     │ │ │
│   │ └───────────┘ │ │
│   │ ┌───────────┐ │ │
│   │ │ Password  │ │ │
│   │ └───────────┘ │ │
│   │               │ │
│   │ [Sign in]     │ │
│   │               │ │
│   │ ─── or ───    │ │
│   │               │ │
│   │ [Continue as  │ │
│   │  guest]       │ │
│   └───────────────┘ │
│                     │
└─────────────────────┘
```

### Desktop (640px+)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              ┌─────────────────────────────────┐            │
│              │           v0 Clone              │            │
│              │                                 │            │
│              │        Welcome back             │            │
│              │                                 │            │
│              │  ┌───────────────────────────┐  │            │
│              │  │ Email                     │  │            │
│              │  └───────────────────────────┘  │            │
│              │  ┌───────────────────────────┐  │            │
│              │  │ Password                  │  │            │
│              │  └───────────────────────────┘  │            │
│              │                                 │            │
│              │  [      Sign in      ]          │            │
│              │                                 │            │
│              │  ───────── or ─────────         │            │
│              │                                 │            │
│              │  [   Continue as guest   ]      │            │
│              │                                 │            │
│              │  Don't have an account?         │            │
│              │  Sign up                        │            │
│              └─────────────────────────────────┘            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Application

| Element | Property | Value |
|---------|----------|-------|
| Page Background | `bg` | `#0F172A` |
| Card Background | `bg` | `#1E293B/80` with blur |
| Card Border | `border` | `rgba(255,255,255,0.1)` |
| Heading Text | `color` | `#F8FAFC` |
| Body Text | `color` | `#F8FAFC` |
| Muted Text | `color` | `#94A3B8` |
| Input Background | `bg` | `#0F172A` |
| Input Border | `border` | `rgba(255,255,255,0.1)` |
| Input Focus Border | `border` | `#22C55E` |
| Primary Button | `bg` | `#22C55E` |
| Secondary Button | `bg` | `transparent` |
| Error | `color` | `#EF4444` |
| Success | `color` | `#22C55E` |
| Link | `color` | `#22C55E` |

---

## ✅ Accessibility Checklist

- [ ] All form inputs have visible labels
- [ ] Error messages are announced (role="alert")
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA
- [ ] Form can be submitted with keyboard
- [ ] Password can be shown/hidden
- [ ] Links have descriptive text
- [ ] Form has proper autocomplete attributes

---

## 🔐 Security Considerations

### Password Field

```tsx
<div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    className="input-field pr-10"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
    aria-label={showPassword ? 'Hide password' : 'Show password'}
  >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>
</div>
```

### Autocomplete Attributes

```tsx
<input
  autoComplete="email"           // For email field
  autoComplete="current-password" // For login password
  autoComplete="new-password"     // For register password
/>
```

---

## 🔗 Related Pages

- [Home Page](./home.md) - After successful login
- [Chat Interface](./chat.md) - After successful login

---

*This page specification is part of the v0 Clone Design System.*
