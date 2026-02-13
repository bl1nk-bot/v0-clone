# Chat Interface Design Specification

> **Page:** Chat Interface
> **Route:** `/chats/[chatId]`
> **Last Updated:** 2026-02-13

---

## 📋 Page Overview

### Purpose
The chat interface is where users interact with the AI to generate and iterate on code. It features a split-screen layout with the conversation on one side and a live preview on the other.

### User Goals
1. View conversation history with AI
2. Send follow-up prompts to iterate on code
3. Preview generated code in real-time
4. Access generated code for copying/downloading
5. Navigate between different chats

---

## 🎨 Visual Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Fixed, 64px)                                       │
├────────────────────────────┬────────────────────────────────┤
│                            │                                │
│    CHAT PANEL (50%)        │    PREVIEW PANEL (50%)         │
│                            │                                │
│  ┌──────────────────────┐  │  ┌──────────────────────────┐  │
│  │                      │  │  │                          │  │
│  │  Message History     │  │  │    Live Preview          │  │
│  │  (Scrollable)        │  │  │    (iframe)              │  │
│  │                      │  │  │                          │  │
│  │                      │  │  │                          │  │
│  └──────────────────────┘  │  └──────────────────────────┘  │
│                            │                                │
│  ┌──────────────────────┐  │  ┌──────────────────────────┐  │
│  │  Chat Input          │  │  │  Preview Toolbar         │  │
│  └──────────────────────┘  │  └──────────────────────────┘  │
│                            │                                │
├────────────────────────────┴────────────────────────────────┤
│  MOBILE BOTTOM TOOLBAR (Mobile only, 56px)                  │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Header (Shared with Home)

Same as Home page header, with additional ChatSelector visible.

#### 2. Chat Panel (Left Side)

**Width:** 50% (resizable)
**Background:** `bg-background`

```tsx
<div className="flex flex-col h-full border-r border-border">
  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-4 md:p-6">
    <ChatMessages
      chatHistory={chatHistory}
      isLoading={isLoading}
      onStreamingComplete={handleStreamingComplete}
    />
  </div>
  
  {/* Input Area */}
  <div className="border-t border-border p-4">
    <ChatInput
      message={message}
      setMessage={setMessage}
      onSubmit={handleSendMessage}
      isLoading={isLoading}
    />
  </div>
</div>
```

#### 3. Preview Panel (Right Side)

**Width:** 50% (resizable)
**Background:** `bg-surface`

```tsx
<div className="flex flex-col h-full">
  {/* Preview Toolbar */}
  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Preview</span>
      {demoUrl && (
        <span className="text-xs text-cta">● Live</span>
      )}
    </div>
    <div className="flex items-center gap-2">
      <button className="ghost-button" title="Refresh">
        <RefreshCw className="w-4 h-4" />
      </button>
      <button className="ghost-button" title="Open in new tab">
        <ExternalLink className="w-4 h-4" />
      </button>
      <button className="ghost-button" title="Fullscreen">
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  </div>
  
  {/* Preview iframe */}
  <div className="flex-1 bg-white rounded-lg m-2 overflow-hidden">
    <iframe
      src={demoUrl}
      className="w-full h-full border-0"
      title="Preview"
    />
  </div>
</div>
```

#### 4. Mobile Bottom Toolbar

**Visible:** Mobile only (`md:hidden`)
**Height:** 56px

```tsx
<div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border md:hidden">
  <div className="flex items-center justify-around h-14">
    <button
      className={cn(
        "flex-1 flex flex-col items-center gap-1 py-2",
        activePanel === 'chat' ? 'text-cta' : 'text-muted'
      )}
      onClick={() => setActivePanel('chat')}
    >
      <MessageSquare className="w-5 h-5" />
      <span className="text-xs">Chat</span>
    </button>
    <button
      className={cn(
        "flex-1 flex flex-col items-center gap-1 py-2",
        activePanel === 'preview' ? 'text-cta' : 'text-muted'
      )}
      onClick={() => setActivePanel('preview')}
    >
      <Eye className="w-5 h-5" />
      <span className="text-xs">Preview</span>
    </button>
  </div>
</div>
```

---

## 💬 Chat Messages

### Message Types

#### User Message

```tsx
<div className="flex justify-end mb-4">
  <div className="
    bg-cta/20 
    border border-cta/30
    rounded-2xl rounded-br-md
    px-4 py-3
    max-w-[80%]
  ">
    <p className="text-text">{message.content}</p>
  </div>
</div>
```

#### AI Message (Streaming)

```tsx
<div className="flex justify-start mb-4">
  <div className="
    bg-surface
    border border-border
    rounded-2xl rounded-bl-md
    px-4 py-3
    max-w-[80%]
  ">
    {/* Streaming content */}
    <StreamingMessage stream={message.stream} />
    <span className="typing-cursor" />
  </div>
</div>
```

#### AI Message (Complete)

```tsx
<div className="flex justify-start mb-4">
  <div className="
    bg-surface
    border border-border
    rounded-2xl rounded-bl-md
    px-4 py-3
    max-w-[80%]
  ">
    {/* Rendered markdown with code blocks */}
    <MessageRenderer content={message.content} />
  </div>
</div>
```

### Code Block Rendering

```tsx
<div className="relative group my-4">
  <pre className="
    bg-background
    border border-border
    rounded-lg p-4
    overflow-x-auto
    text-sm
  ">
    <code className="text-text font-mono">
      {code}
    </code>
  </pre>
  
  {/* Copy button */}
  <button className="
    absolute top-2 right-2
    opacity-0 group-hover:opacity-100
    bg-surface hover:bg-surface-hover
    border border-border
    rounded px-2 py-1
    text-xs text-muted
    transition-opacity duration-200
    cursor-pointer
  ">
    <Copy className="w-4 h-4" />
  </button>
</div>
```

---

## 📝 Chat Input

### Input Component

```tsx
<form onSubmit={handleSubmit} className="relative">
  <div className="
    bg-surface
    border border-border
    focus-within:border-cta/50
    rounded-xl
    transition-colors duration-200
  ">
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Send a message to iterate..."
      className="
        w-full bg-transparent
        px-4 py-3
        text-text placeholder:text-muted
        resize-none min-h-[48px] max-h-[200px]
        focus:outline-none
      "
      rows={1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          handleSubmit(e)
        }
      }}
    />
    
    <div className="flex items-center justify-between px-4 py-2 border-t border-border">
      <div className="flex items-center gap-2">
        <button type="button" className="ghost-button">
          <ImageIcon className="w-5 h-5 text-muted" />
        </button>
      </div>
      
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="
          bg-cta hover:bg-cta/90
          disabled:opacity-50 disabled:cursor-not-allowed
          text-white font-medium
          px-4 py-2 rounded-lg
          transition-all duration-200
          cursor-pointer
        "
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </div>
  </div>
</form>
```

---

## 🎭 Interactions

### Resizable Panels

```tsx
// Using react-resizable-panels or custom implementation
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50} minSize={30}>
    {/* Chat Panel */}
  </ResizablePanel>
  <ResizableHandle className="w-1 bg-border hover:bg-cta/50 transition-colors cursor-col-resize" />
  <ResizablePanel defaultSize={50} minSize={30}>
    {/* Preview Panel */}
  </ResizablePanel>
</ResizablePanelGroup>
```

### Streaming Animation

```css
/* Character-by-character reveal */
@keyframes stream-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.streaming-char {
  animation: stream-in 0.05s ease-out forwards;
}

/* Typing cursor */
.typing-cursor::after {
  content: '▋';
  animation: blink 1s step-end infinite;
  color: #22C55E;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

### Loading States

```tsx
// Skeleton for messages
<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="animate-pulse">
      <div className="h-4 bg-surface rounded w-3/4 mb-2" />
      <div className="h-4 bg-surface rounded w-1/2" />
    </div>
  ))}
</div>

// Loading indicator
<div className="flex items-center gap-2 text-muted">
  <Loader2 className="w-4 h-4 animate-spin" />
  <span className="text-sm">Generating...</span>
</div>
```

---

## 📱 Responsive Design

### Mobile (< 768px)

Single panel view with bottom navigation:

```
┌─────────────────────┐
│ Header (64px)       │
├─────────────────────┤
│                     │
│  Active Panel       │
│  (Full Screen)      │
│                     │
│                     │
├─────────────────────┤
│ [Chat]  [Preview]   │  ← Bottom Toolbar (56px)
└─────────────────────┘
```

### Tablet (768px - 1024px)

Split view with narrower panels:

```
┌─────────────────────────────────────┐
│ Header (64px)                       │
├──────────────────┬──────────────────┤
│                  │                  │
│  Chat Panel      │  Preview Panel   │
│  (50%)           │  (50%)           │
│                  │                  │
└──────────────────┴──────────────────┘
```

### Desktop (1024px+)

Full split view with resizable panels:

```
┌───────────────────────────────────────────────────────┐
│ Header (64px)                                         │
├────────────────────────────┬──────────────────────────┤
│                            │                          │
│  Chat Panel (resizable)    │  Preview Panel           │
│                            │  (resizable)             │
│                            │                          │
└────────────────────────────┴──────────────────────────┘
```

---

## 🎨 Color Application

| Element | Property | Value |
|---------|----------|-------|
| Chat Panel Background | `bg` | `#0F172A` |
| Preview Panel Background | `bg` | `#1E293B` |
| User Message Background | `bg` | `rgba(34,197,94,0.2)` |
| User Message Border | `border` | `rgba(34,197,94,0.3)` |
| AI Message Background | `bg` | `#1E293B` |
| AI Message Border | `border` | `rgba(255,255,255,0.1)` |
| Code Block Background | `bg` | `#0F172A` |
| Input Background | `bg` | `#1E293B` |
| Input Focus Border | `border` | `rgba(34,197,94,0.5)` |
| Send Button | `bg` | `#22C55E` |

---

## ✅ Accessibility Checklist

- [ ] Messages are in a scrollable, focusable region
- [ ] New messages are announced (aria-live)
- [ ] Code blocks have copy functionality
- [ ] Input has visible label
- [ ] Keyboard shortcuts work (Enter to send)
- [ ] Focus management during streaming
- [ ] Preview iframe has title
- [ ] Resizable panels have keyboard controls

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in input |
| `Escape` | Close fullscreen preview |
| `Ctrl/Cmd + K` | Focus input |
| `Ctrl/Cmd + Shift + R` | Refresh preview |

---

## 🔗 Related Pages

- [Home Page](./home.md) - New chat creation
- [Authentication](./auth.md) - User authentication

---

*This page specification is part of the v0 Clone Design System.*
