# v0 Clone - Component Library Specifications

> **Version:** 1.0.0 | **Last Updated:** 2026-02-13
> **Stack:** React 19 + Tailwind CSS 4 + shadcn/ui + Lucide Icons

---

## 📋 Table of Contents

1. [Button Components](#button-components)
2. [Input Components](#input-components)
3. [Card Components](#card-components)
4. [Navigation Components](#navigation-components)
5. [Feedback Components](#feedback-components)
6. [Layout Components](#layout-components)
7. [Chat Components](#chat-components)
8. [Utility Components](#utility-components)

---

## 🎯 Design Tokens

### CSS Variables

```css
:root {
  /* Colors */
  --color-primary: #1E293B;
  --color-secondary: #334155;
  --color-cta: #22C55E;
  --color-background: #0F172A;
  --color-text: #F8FAFC;
  --color-surface: #1E293B;
  --color-surface-hover: #334155;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;
  --color-success: #22C55E;
  --color-muted: #94A3B8;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-out;
  --transition-slow: 300ms ease-in-out;
}
```

---

## 🔘 Button Components

### Button Variants

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // Base styles
  `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    transition-all duration-200
    cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-background
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-cta text-white
          hover:bg-cta/90
          hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]
        `,
        secondary: `
          bg-transparent text-text
          border border-border
          hover:bg-surface hover:border-cta/50
        `,
        ghost: `
          bg-transparent text-muted
          hover:bg-surface hover:text-text
        `,
        destructive: `
          bg-error text-white
          hover:bg-error/90
        `,
        outline: `
          bg-transparent text-text
          border border-border
          hover:bg-surface
        `,
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function Button({
  className,
  variant,
  size,
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
```

### Usage Examples

```tsx
// Primary button
<Button>Generate Code</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Ghost icon button
<Button variant="ghost" size="icon">
  <Settings className="w-5 h-5" />
</Button>

// Loading state
<Button loading>Processing...</Button>

// Destructive action
<Button variant="destructive">Delete</Button>
```

---

## 📝 Input Components

### Text Input

```tsx
// components/ui/input.tsx
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ReactNode
}

export function Input({ className, error, icon, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full bg-background border rounded-lg px-4 py-3',
            'text-text placeholder:text-muted',
            'focus:border-cta focus:ring-1 focus:ring-cta',
            'transition-colors duration-200',
            error ? 'border-error' : 'border-border',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
```

### Textarea

```tsx
// components/ui/textarea.tsx
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      <textarea
        className={cn(
          'w-full bg-background border rounded-xl px-4 py-3',
          'text-text placeholder:text-muted',
          'focus:border-cta focus:ring-1 focus:ring-cta',
          'resize-none min-h-[80px]',
          'transition-colors duration-200',
          error ? 'border-error' : 'border-border',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
```

### Form Field Wrapper

```tsx
// components/ui/form-field.tsx
export interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-text"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-sm text-muted">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
```

---

## 🃏 Card Components

### Base Card

```tsx
// components/ui/card.tsx
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  clickable?: boolean
}

export function Card({
  className,
  hoverable,
  clickable,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl p-6',
        'transition-all duration-200',
        hoverable && 'hover:border-cta/50 hover:shadow-lg',
        clickable && 'cursor-pointer hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-text', className)} {...props} />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-muted', className)} {...props} />
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props} />
  )
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-border', className)} {...props} />
  )
}
```

### Glass Card

```tsx
// components/ui/glass-card.tsx
export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-surface/80 backdrop-blur-xl',
        'border border-border',
        'rounded-2xl p-6',
        'shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

---

## 🧭 Navigation Components

### App Header

```tsx
// components/shared/app-header.tsx
export function AppHeader() {
  return (
    <header className="
      fixed top-0 left-0 right-0 z-50
      h-16
      bg-background/80 backdrop-blur-xl
      border-b border-border
    ">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-text hover:text-cta transition-colors">
          v0 Clone
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          <ChatSelector />
          <Button variant="ghost" size="sm">
            <Info className="w-4 h-4" />
            What's This?
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/vercel/v0-sdk" target="_blank" rel="noopener noreferrer">
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <a href={DEPLOY_URL} target="_blank" rel="noopener noreferrer">
              <VercelIcon className="w-4 h-4" />
              Deploy
            </a>
          </Button>
          <UserNav />
        </nav>
        
        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-2">
          <UserNav />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
```

### Chat Selector

```tsx
// components/shared/chat-selector.tsx
export function ChatSelector() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Chats
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b border-border">
          <Input placeholder="Search chats..." icon={<Search className="w-4 h-4" />} />
        </div>
        <ScrollArea className="h-[300px]">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className="w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors cursor-pointer"
              onClick={() => navigateToChat(chat.id)}
            >
              <p className="text-sm font-medium text-text truncate">{chat.title}</p>
              <p className="text-xs text-muted">{formatDate(chat.updatedAt)}</p>
            </button>
          ))}
        </ScrollArea>
        <div className="p-2 border-t border-border">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

### User Navigation

```tsx
// components/user-nav.tsx
export function UserNav({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
        <Button variant="primary" size="sm" asChild>
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    )
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-0.5 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session.user?.image || ''} />
            <AvatarFallback>
              {session.user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{session.user?.name}</span>
            <span className="text-xs text-muted font-normal">
              {session.user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/chats">
            <MessageSquare className="w-4 h-4 mr-2" />
            My Chats
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 💬 Feedback Components

### Toast / Notification

```tsx
// components/ui/toast.tsx
export interface ToastProps {
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
}

export function Toast({ title, description, variant = 'default' }: ToastProps) {
  const icons = {
    default: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <XCircle className="w-5 h-5 text-error" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  }
  
  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
      'bg-surface border-border',
      variant === 'error' && 'border-error/50',
      variant === 'success' && 'border-success/50'
    )}>
      {icons[variant]}
      <div className="flex-1">
        <p className="text-sm font-medium text-text">{title}</p>
        {description && (
          <p className="text-sm text-muted mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}
```

### Loading Spinner

```tsx
// components/ui/loader.tsx
export function Spinner({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }
  
  return (
    <Loader2 className={cn('animate-spin text-cta', sizes[size], className)} />
  )
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-cta rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}
```

### Skeleton Loader

```tsx
// components/ui/skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-surface rounded-md', className)} />
  )
}

export function MessageSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}
```

---

## 📐 Layout Components

### Resizable Panel Layout

```tsx
// components/shared/resizable-layout.tsx
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export function ResizableLayout({
  leftPanel,
  rightPanel,
  singlePanelMode,
  activePanel,
}: {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
  singlePanelMode: boolean
  activePanel: 'left' | 'right'
}) {
  if (singlePanelMode) {
    return (
      <div className="h-full">
        {activePanel === 'left' ? leftPanel : rightPanel}
      </div>
    )
  }
  
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={50} minSize={30} className="flex flex-col">
        {leftPanel}
      </Panel>
      <PanelResizeHandle className="w-1 bg-border hover:bg-cta/50 transition-colors cursor-col-resize" />
      <Panel defaultSize={50} minSize={30} className="flex flex-col">
        {rightPanel}
      </Panel>
    </PanelGroup>
  )
}
```

### Bottom Toolbar (Mobile)

```tsx
// components/shared/bottom-toolbar.tsx
export function BottomToolbar({
  activePanel,
  onPanelChange,
  hasPreview,
}: {
  activePanel: 'chat' | 'preview'
  onPanelChange: (panel: 'chat' | 'preview') => void
  hasPreview: boolean
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border md:hidden z-40">
      <div className="flex items-center justify-around h-14">
        <button
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-2 transition-colors cursor-pointer',
            activePanel === 'chat' ? 'text-cta' : 'text-muted'
          )}
          onClick={() => onPanelChange('chat')}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Chat</span>
        </button>
        <button
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-2 transition-colors cursor-pointer',
            activePanel === 'preview' ? 'text-cta' : 'text-muted',
            !hasPreview && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => hasPreview && onPanelChange('preview')}
          disabled={!hasPreview}
        >
          <Eye className="w-5 h-5" />
          <span className="text-xs">Preview</span>
        </button>
      </div>
    </div>
  )
}
```

---

## 💬 Chat Components

### Chat Message

```tsx
// components/chat/chat-message.tsx
export function ChatMessage({
  message,
  isStreaming,
}: {
  message: { type: 'user' | 'assistant'; content: string }
  isStreaming?: boolean
}) {
  const isUser = message.type === 'user'
  
  return (
    <div className={cn('flex mb-4', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-cta/20 border border-cta/30 rounded-br-md'
            : 'bg-surface border border-border rounded-bl-md'
        )}
      >
        {isStreaming ? (
          <StreamingMessage content={message.content} />
        ) : (
          <MessageRenderer content={message.content} />
        )}
      </div>
    </div>
  )
}
```

### Chat Input

```tsx
// components/chat/chat-input.tsx
export function ChatInput({
  message,
  setMessage,
  onSubmit,
  isLoading,
  showSuggestions = true,
}: {
  message: string
  setMessage: (msg: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  showSuggestions?: boolean
}) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="
        bg-surface border border-border
        focus-within:border-cta/50
        rounded-xl transition-colors duration-200
      ">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="
            w-full bg-transparent px-4 py-3
            text-text placeholder:text-muted
            resize-none min-h-[48px] max-h-[200px]
            focus:outline-none
          "
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSubmit(e)
            }
          }}
        />
        
        <div className="flex items-center justify-between px-4 py-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" type="button">
              <ImageIcon className="w-5 h-5 text-muted" />
            </Button>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!message.trim() || isLoading}
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
```

### Code Block

```tsx
// components/ai-elements/code-block.tsx
export function CodeBlock({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-background border border-border rounded-t-lg border-b-0">
        <span className="text-xs text-muted font-mono">{language || 'code'}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <pre className="bg-background border border-border rounded-b-lg p-4 overflow-x-auto">
        <code className="text-sm text-text font-mono">
          {code}
        </code>
      </pre>
    </div>
  )
}
```

---

## 🔧 Utility Components

### Badge

```tsx
// components/ui/badge.tsx
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-surface text-text border border-border',
        success: 'bg-success/20 text-success border border-success/30',
        error: 'bg-error/20 text-error border border-error/30',
        warning: 'bg-warning/20 text-warning border border-warning/30',
        info: 'bg-info/20 text-info border border-info/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badgeVariants({ variant, className })} {...props} />
}
```

### Tooltip

```tsx
// components/ui/tooltip.tsx
export function Tooltip({
  content,
  children,
}: {
  content: string
  children: React.ReactNode
}) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="
              z-50 px-3 py-1.5
              bg-surface border border-border
              rounded-lg shadow-lg
              text-sm text-text
              animate-in fade-in-0 zoom-in-95
            "
            sideOffset={5}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
```

### Avatar

```tsx
// components/ui/avatar.tsx
export function Avatar({ src, fallback, className }: AvatarProps) {
  return (
    <RadixAvatar.Root className={cn('relative w-8 h-8 rounded-full overflow-hidden', className)}>
      <RadixAvatar.Image
        src={src}
        className="w-full h-full object-cover"
      />
      <RadixAvatar.Fallback className="
        w-full h-full flex items-center justify-center
        bg-surface text-text text-sm font-medium
      ">
        {fallback}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
```

---

## 📦 Export Index

```tsx
// components/index.ts
export * from './ui/button'
export * from './ui/input'
export * from './ui/textarea'
export * from './ui/card'
export * from './ui/badge'
export * from './ui/avatar'
export * from './ui/tooltip'
export * from './ui/dialog'
export * from './ui/dropdown-menu'
export * from './ui/scroll-area'
export * from './ui/loader'
export * from './ui/skeleton'

export * from './shared/app-header'
export * from './shared/chat-selector'
export * from './shared/mobile-menu'
export * from './shared/bottom-toolbar'
export * from './shared/resizable-layout'

export * from './chat/chat-input'
export * from './chat/chat-messages'
export * from './chat/preview-panel'
```

---

*This component library specification is part of the v0 Clone Design System.*
