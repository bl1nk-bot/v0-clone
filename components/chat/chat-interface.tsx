'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChatBubble, ChatBubbleGroup } from '@/components/ui/chat-bubble'
import { Card } from '@/components/ui/card'
import { AppLayout } from '@/components/layout/app-layout'
import { NavBar, NavLink, MobileNav, SkipLink, TabsNav } from '@/components/layout/app-nav'
import {
  Send,
  Image,
  RefreshCw,
  ExternalLink,
  Maximize2,
  Minimize2,
  MessageSquare,
  Eye,
  Copy,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react'

/**
 * Chat Interface Component
 * 
 * Design System compliant chat interface with
 * split view, preview panel, and responsive design.
 * 
 * @see design-system/v0-clone/pages/chat.md
 */

// ============================================
// TYPES
// ============================================

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
  isStreaming?: boolean
  stream?: ReadableStream<Uint8Array> | null
}

export interface ChatInterfaceProps {
  /** Chat messages */
  messages: ChatMessage[]
  /** Current input value */
  inputValue: string
  /** Input change handler */
  onInputChange: (value: string) => void
  /** Send message handler */
  onSendMessage: (message: string) => void
  /** Loading state */
  isLoading?: boolean
  /** Preview URL */
  previewUrl?: string
  /** User session */
  session?: any
  /** Chat ID */
  chatId?: string
  /** Additional className */
  className?: string
}

// ============================================
// CHAT INPUT COMPONENT
// ============================================

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  disabled?: boolean
}

function ChatInput({ value, onChange, onSubmit, isLoading, disabled }: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !isLoading && !disabled) {
        onSubmit(e)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-border p-4">
      <div
        className={cn(
          'relative rounded-xl',
          'bg-surface border border-border',
          'focus-within:border-cta/50',
          'transition-colors duration-200'
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message to iterate..."
          disabled={disabled || isLoading}
          className={cn(
            'w-full bg-transparent',
            'px-4 py-3',
            'text-text placeholder:text-muted',
            'resize-none min-h-[48px] max-h-[200px]',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          rows={1}
          aria-label="Chat message input"
        />

        <div className="flex items-center justify-between px-4 py-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={disabled || isLoading}
              aria-label="Attach image"
            >
              <Image className="w-4 h-4" />
            </Button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!value.trim() || isLoading || disabled}
            loading={isLoading}
          >
            {isLoading ? undefined : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </form>
  )
}

// ============================================
// PREVIEW PANEL COMPONENT
// ============================================

interface PreviewPanelProps {
  url?: string
  isLoading?: boolean
  onRefresh?: () => void
  className?: string
}

function PreviewPanel({ url, isLoading, onRefresh, className }: PreviewPanelProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleCopyUrl = async () => {
    if (url) {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text">Preview</span>
          {url && (
            <span className="flex items-center gap-1 text-xs text-cta">
              <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
              Live
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onRefresh}
            disabled={!url || isLoading}
            aria-label="Refresh preview"
          >
            <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopyUrl}
            disabled={!url}
            aria-label="Copy URL"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            asChild
            disabled={!url}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview iframe */}
      <div className="flex-1 bg-white rounded-lg m-2 overflow-hidden">
        {url ? (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-muted mx-auto mb-4" />
              <p className="text-muted">
                Preview will appear here once code is generated
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// MOBILE BOTTOM TOOLBAR
// ============================================

interface MobileToolbarProps {
  activePanel: 'chat' | 'preview'
  onPanelChange: (panel: 'chat' | 'preview') => void
  hasPreview?: boolean
}

function MobileToolbar({ activePanel, onPanelChange, hasPreview }: MobileToolbarProps) {
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

// ============================================
// MAIN CHAT INTERFACE
// ============================================

export function ChatInterface({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading = false,
  previewUrl,
  session,
  chatId,
  className,
}: ChatInterfaceProps) {
  const [activePanel, setActivePanel] = React.useState<'chat' | 'preview'>('chat')
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim())
    }
  }

  return (
    <>
      <SkipLink targetId="main-content" />

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
          <NavBar
            logo={
              <a
                href="/"
                className="text-lg font-semibold text-text hover:text-cta transition-colors"
              >
                v0 Clone
              </a>
            }
            rightContent={
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-3">
                  {chatId && (
                    <NavLink href={`/chats/${chatId}`}>
                      Current Chat
                    </NavLink>
                  )}
                </div>

                {/* User Navigation */}
                {session ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted hidden sm:block">
                      {session.user?.email}
                    </span>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/login">Sign in</a>
                    </Button>
                  </div>
                )}

                {/* Mobile Menu */}
                <MobileNav
                  open={mobileMenuOpen}
                  onOpenChange={setMobileMenuOpen}
                >
                  <NavLink href="/">New Chat</NavLink>
                  <NavLink href="/chats">My Chats</NavLink>
                </MobileNav>
              </>
            }
          />
        </header>

        {/* Main Content */}
        <main
          id="main-content"
          className={cn(
            'flex-1 flex flex-col md:flex-row',
            'h-[calc(100vh-64px-56px)] md:h-[calc(100vh-64px)]',
            className
          )}
        >
          {/* Chat Panel */}
          <div
            className={cn(
              'flex flex-col h-full',
              'w-full md:w-1/2',
              activePanel === 'chat' ? 'flex' : 'hidden md:flex'
            )}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <ChatBubbleGroup>
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    variant={message.type}
                    timestamp={message.timestamp}
                    isStreaming={message.isStreaming}
                    showCopyButton={message.type === 'assistant'}
                  >
                    {message.content}
                  </ChatBubble>
                ))}
              </ChatBubbleGroup>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-border" />

          {/* Preview Panel */}
          <div
            className={cn(
              'flex flex-col h-full',
              'w-full md:w-1/2',
              'border-l border-border',
              activePanel === 'preview' ? 'flex' : 'hidden md:flex'
            )}
          >
            <PreviewPanel
              url={previewUrl}
              isLoading={isLoading}
            />
          </div>
        </main>

        {/* Mobile Bottom Toolbar */}
        <MobileToolbar
          activePanel={activePanel}
          onPanelChange={setActivePanel}
          hasPreview={!!previewUrl}
        />
      </div>
    </>
  )
}

export default ChatInterface
