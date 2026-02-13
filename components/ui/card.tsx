import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Card Component
 * 
 * Design System compliant card with multiple variants.
 * Supports hover effects, glass morphism, and accessibility.
 * 
 * @see design-system/v0-clone/COMPONENTS.md
 */

const cardVariants = cva(
  `
    rounded-xl border
    transition-all duration-200
  `,
  {
    variants: {
      variant: {
        default: `
          bg-surface border-border
        `,
        glass: `
          bg-surface/80 backdrop-blur-xl
          border-border
          shadow-xl
        `,
        outline: `
          bg-transparent border-border
        `,
        elevated: `
          bg-surface border-border
          shadow-lg
        `,
      },
      hoverable: {
        true: `
          hover:border-cta/50
          hover:shadow-lg
          hover:-translate-y-0.5
          cursor-pointer
        `,
        false: '',
      },
      clickable: {
        true: 'cursor-pointer active:scale-[0.99]',
        false: '',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      hoverable: false,
      clickable: false,
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Make card hoverable with lift effect */
  hoverable?: boolean
  /** Make card clickable with press effect */
  clickable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hoverable, clickable, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, hoverable, clickable, padding, className }))}
      {...props}
    />
  )
)
Card.displayName = 'Card'

/**
 * Card Header
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 mb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * Card Title
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-text leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

/**
 * Card Description
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * Card Content
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

/**
 * Card Footer
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 mt-4 border-t border-border', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
