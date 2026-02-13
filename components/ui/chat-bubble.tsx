import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { User, Bot, Copy, Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

/**
 * ChatBubble Component
 * 
 * Design System compliant chat message bubble with
 * streaming support, code blocks, and accessibility.
 * 
 * @see design-system/v0-clone/COMPONENTS.md
 */

const bubbleVariants = cva(
  `
    max-w-[85%] rounded-2xl px-4 py-3
    animate-[slide-up_0.2s_ease-out]
  `,
  {
    variants: {
      variant: {
        user: `
          bg-cta/20 border border-cta/30
          rounded-br-md
          ml-auto
        `,
        assistant: `
          bg-surface border border-border
          rounded-bl-md
        `,
        system: `
          bg-muted/50 border border-border
          rounded-md
          mx-auto text-center
        `,
      },
    },
    defaultVariants: {
      variant: 'assistant',
    },
  }
)

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {
  /** Message content */
  children: React.ReactNode
  /** Show avatar */
  showAvatar?: boolean
  /** Avatar URL or icon */
  avatar?: string
  /** Timestamp */
  timestamp?: string
  /** Is currently streaming */
  isStreaming?: boolean
  /** Show copy button */
  showCopyButton?: boolean
  /** Copy content */
  copyContent?: string
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      className,
      variant,
      children,
      showAvatar = true,
      avatar,
      timestamp,
      isStreaming,
      showCopyButton,
      copyContent,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      const textToCopy = copyContent || (typeof children === 'string' ? children : '')
      if (textToCopy) {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }

    const isUser = variant === 'user'

    return (
      <div
        className={cn(
          'flex gap-3',
          isUser ? 'flex-row-reverse' : 'flex-row',
          className
        )}
      >
        {/* Avatar */}
        {showAvatar && (
          <div
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
              isUser ? 'bg-cta/20' : 'bg-surface border border-border'
            )}
            aria-hidden="true"
          >
            {avatar ? (
              <img src={avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : isUser ? (
              <User className="w-4 h-4 text-cta" />
            ) : (
              <Bot className="w-4 h-4 text-muted" />
            )}
          </div>
        )}

        {/* Message bubble */}
        <div className="flex flex-col gap-1">
          <div
            ref={ref}
            className={bubbleVariants({ variant })}
            {...props}
          >
            {/* Content */}
            <div className="text-sm text-text leading-relaxed">
              {children}
            </div>

            {/* Streaming cursor */}
            {isStreaming && (
              <span className="typing-cursor" aria-hidden="true" />
            )}
          </div>

          {/* Footer: timestamp and copy button */}
          <div
            className={cn(
              'flex items-center gap-2 text-xs text-muted',
              isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {timestamp && (
              <time dateTime={timestamp}>{formatTime(timestamp)}</time>
            )}
            {showCopyButton && !isUser && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCopy}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={copied ? 'Copied' : 'Copy message'}
              >
                {copied ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)
ChatBubble.displayName = 'ChatBubble'

/**
 * ChatBubbleGroup - Container for multiple chat bubbles
 */
const ChatBubbleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-4', className)}
    {...props}
  >
    {children}
  </div>
))
ChatBubbleGroup.displayName = 'ChatBubbleGroup'

/**
 * Helper function to format timestamp
 */
function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export { ChatBubble, ChatBubbleGroup, bubbleVariants }
