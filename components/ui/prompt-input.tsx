'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import {
  Send,
  Image,
  Mic,
  X,
  Loader2,
  Sparkles,
} from 'lucide-react'

/**
 * PromptInput Component
 * 
 * Design System compliant prompt input with
 * image attachments, voice input, and loading states.
 * 
 * @see design-system/v0-clone/pages/home.md
 */

export interface PromptInputProps {
  /** Current value */
  value: string
  /** Value change handler */
  onChange: (value: string) => void
  /** Submit handler */
  onSubmit: (e: React.FormEvent) => void
  /** Loading state */
  isLoading?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Show image upload button */
  showImageButton?: boolean
  /** Show voice input button */
  showVoiceButton?: boolean
  /** Image attachments */
  attachments?: ImageAttachment[]
  /** Attachment change handler */
  onAttachmentsChange?: (attachments: ImageAttachment[]) => void
  /** Additional className */
  className?: string
  /** Disabled state */
  disabled?: boolean
}

export interface ImageAttachment {
  id: string
  dataUrl: string
  file?: File
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Describe what you want to build...',
  showImageButton = true,
  showVoiceButton = true,
  attachments = [],
  onAttachmentsChange,
  className,
  disabled = false,
}: PromptInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = React.useState(false)

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [value])

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !isLoading && !disabled) {
        onSubmit(e)
      }
    }
  }

  // Handle file selection
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || !onAttachmentsChange) return

    const newAttachments: ImageAttachment[] = []
    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        const dataUrl = await readFileAsDataURL(file)
        newAttachments.push({
          id: crypto.randomUUID(),
          dataUrl,
          file,
        })
      }
    }
    onAttachmentsChange([...attachments, ...newAttachments])
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  // Remove attachment
  const removeAttachment = (id: string) => {
    onAttachmentsChange?.(attachments.filter((a) => a.id !== id))
  }

  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <div
        className={cn(
          'relative rounded-2xl',
          'bg-surface/80 backdrop-blur-xl',
          'border transition-colors duration-200',
          isDragOver
            ? 'border-cta ring-2 ring-cta/20'
            : 'border-border',
          'focus-within:border-cta/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Image attachments preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 pb-0">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="relative group"
              >
                <img
                  src={attachment.dataUrl}
                  alt="Attached image"
                  className="w-16 h-16 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.id)}
                  className={cn(
                    'absolute -top-1.5 -right-1.5',
                    'w-5 h-5 rounded-full',
                    'bg-destructive text-white',
                    'flex items-center justify-center',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200',
                    'cursor-pointer'
                  )}
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={cn(
            'w-full bg-transparent',
            'px-4 py-4',
            'text-text placeholder:text-muted',
            'resize-none min-h-[80px] max-h-[200px]',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            attachments.length > 0 && 'pt-2'
          )}
          rows={1}
          aria-label="Enter your prompt"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          {/* Left side buttons */}
          <div className="flex items-center gap-1">
            {showImageButton && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled || isLoading}
                  aria-label="Attach image"
                >
                  <Image className="w-5 h-5" />
                </Button>
              </>
            )}
            {showVoiceButton && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={disabled || isLoading}
                aria-label="Voice input"
              >
                <Mic className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!value.trim() || isLoading || disabled}
            leftIcon={isLoading ? undefined : <Sparkles className="w-4 h-4" />}
            loading={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      {/* Drag overlay */}
      {isDragOver && (
        <div
          className={cn(
            'absolute inset-0 z-10',
            'bg-cta/10 backdrop-blur-sm',
            'rounded-2xl border-2 border-dashed border-cta',
            'flex items-center justify-center',
            'pointer-events-none'
          )}
        >
          <p className="text-cta font-medium">Drop images here</p>
        </div>
      )}
    </form>
  )
}

/**
 * Helper function to read file as data URL
 */
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Suggestion Chips Component
 */
export interface SuggestionChip {
  id: string
  text: string
  icon?: React.ReactNode
}

export interface SuggestionChipsProps {
  suggestions: SuggestionChip[]
  /** Click handler */
  onClick?: (suggestion: SuggestionChip) => void
  /** Additional className */
  className?: string
}

export function SuggestionChips({
  suggestions,
  onClick,
  className,
}: SuggestionChipsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-2',
        className
      )}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => onClick?.(suggestion)}
          className={cn(
            'flex items-center gap-2',
            'px-4 py-2 rounded-full',
            'bg-surface border border-border',
            'text-sm text-text',
            'hover:bg-surface-hover hover:border-cta/50',
            'transition-all duration-200',
            'cursor-pointer'
          )}
        >
          {suggestion.icon}
          {suggestion.text}
        </button>
      ))}
    </div>
  )
}
