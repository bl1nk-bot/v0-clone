import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Input Component
 * 
 * Design System compliant input with validation states,
 * icons, and accessibility features.
 * 
 * @see design-system/v0-clone/COMPONENTS.md
 */

const inputVariants = cva(
  `
    w-full rounded-lg
    bg-background border
    text-text placeholder:text-muted
    transition-all duration-200
    focus:outline-none
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          border-border
          focus:border-cta focus:ring-1 focus:ring-cta
        `,
        error: `
          border-destructive
          focus:ring-1 focus:ring-destructive
        `,
        success: `
          border-success
          focus:ring-1 focus:ring-success
        `,
      },
      inputSize: {
        sm: 'h-8 px-3 py-1.5 text-sm',
        md: 'h-10 px-4 py-2.5 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Error message to display */
  error?: string
  /** Success message to display */
  success?: string
  /** Hint text to display below input */
  hint?: string
  /** Icon to display on the left */
  leftIcon?: React.ReactNode
  /** Icon to display on the right */
  rightIcon?: React.ReactNode
  /** Label for the input */
  label?: string
  /** Show password toggle for password inputs */
  showPasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      error,
      success,
      hint,
      leftIcon,
      rightIcon,
      label,
      id,
      showPasswordToggle = false,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputId = id || React.useId()
    
    // Determine variant based on state
    const computedVariant = error ? 'error' : success ? 'success' : variant
    
    // Determine if this is a password input with toggle
    const isPasswordInput = type === 'password' && showPasswordToggle
    const inputType = isPasswordInput ? (showPassword ? 'text' : 'password') : type

    const inputElement = (
      <div className="relative">
        {leftIcon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            aria-hidden="true"
          >
            {leftIcon}
          </div>
        )}
        <input
          type={inputType}
          id={inputId}
          className={cn(
            inputVariants({ variant: computedVariant, inputSize }),
            leftIcon && 'pl-10',
            (rightIcon || isPasswordInput || success || error) && 'pr-10',
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          required={required}
          {...props}
        />
        
        {/* Password toggle */}
        {isPasswordInput && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
        
        {/* Status icons */}
        {!isPasswordInput && error && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive"
            aria-hidden="true"
          >
            <AlertCircle className="h-4 w-4" />
          </div>
        )}
        {!isPasswordInput && success && !error && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-success"
            aria-hidden="true"
          >
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
        
        {/* Custom right icon */}
        {!isPasswordInput && !error && !success && rightIcon && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            {rightIcon}
          </div>
        )}
      </div>
    )

    // If no label, return just the input
    if (!label) {
      return (
        <div className="space-y-1">
          {inputElement}
          {error && (
            <p
              id={`${inputId}-error`}
              className="text-sm text-destructive flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
          {hint && !error && (
            <p id={`${inputId}-hint`} className="text-sm text-muted">
              {hint}
            </p>
          )}
        </div>
      )
    }

    // With label
    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text"
        >
          {label}
          {required && (
            <span className="text-destructive ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {inputElement}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
