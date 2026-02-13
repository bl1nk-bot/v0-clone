'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

/**
 * AppLayout Component
 * 
 * Main layout wrapper with header and responsive design.
 * Provides consistent structure across all pages.
 * 
 * @see design-system/v0-clone/COMPONENTS.md
 */

export interface AppLayoutProps {
  children: React.ReactNode
  /** Show header */
  showHeader?: boolean
  /** Additional header content */
  headerContent?: React.ReactNode
  /** Additional className for main content */
  mainClassName?: string
}

export function AppLayout({
  children,
  showHeader = true,
  headerContent,
  mainClassName,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && (
        <header
          className="
            sticky top-0 z-50
            h-16
            bg-background/80 backdrop-blur-xl
            border-b border-border
          "
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            {headerContent}
          </div>
        </header>
      )}
      
      <main className={cn('flex-1', mainClassName)}>
        {children}
      </main>
    </div>
  )
}

/**
 * PageContainer - Consistent page padding and max-width
 */
export interface PageContainerProps {
  children: React.ReactNode
  /** Max width variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Additional className */
  className?: string
}

export function PageContainer({
  children,
  size = 'lg',
  className,
}: PageContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Section - Consistent section spacing
 */
export interface SectionProps {
  children: React.ReactNode
  /** Section ID */
  id?: string
  /** Additional className */
  className?: string
  /** Background variant */
  variant?: 'default' | 'surface' | 'muted'
}

export function Section({
  children,
  id,
  className,
  variant = 'default',
}: SectionProps) {
  const variantClasses = {
    default: 'bg-background',
    surface: 'bg-surface',
    muted: 'bg-muted/30',
  }

  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16 lg:py-20',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </section>
  )
}

/**
 * Grid - Responsive grid layout
 */
export interface GridProps {
  children: React.ReactNode
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg'
  /** Additional className */
  className?: string
}

export function Grid({
  children,
  cols = 3,
  gap = 'md',
  className,
}: GridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  return (
    <div
      className={cn(
        'grid',
        colsClasses[cols],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Flex - Flexible layout component
 */
export interface FlexProps {
  children: React.ReactNode
  /** Direction */
  direction?: 'row' | 'col'
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Gap size */
  gap?: 'none' | 'sm' | 'md' | 'lg'
  /** Additional className */
  className?: string
}

export function Flex({
  children,
  direction = 'row',
  justify = 'start',
  align = 'center',
  gap = 'md',
  className,
}: FlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        justifyClasses[justify],
        alignClasses[align],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Spacer - Add vertical or horizontal space
 */
export interface SpacerProps {
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Direction */
  direction?: 'vertical' | 'horizontal'
}

export function Spacer({ size = 'md', direction = 'vertical' }: SpacerProps) {
  const sizeClasses = {
    sm: direction === 'vertical' ? 'h-4' : 'w-4',
    md: direction === 'vertical' ? 'h-8' : 'w-8',
    lg: direction === 'vertical' ? 'h-12' : 'w-12',
    xl: direction === 'vertical' ? 'h-16' : 'w-16',
  }

  return <div className={sizeClasses[size]} aria-hidden="true" />
}

/**
 * Divider - Horizontal or vertical divider
 */
export interface DividerProps {
  /** Direction */
  direction?: 'horizontal' | 'vertical'
  /** Additional className */
  className?: string
}

export function Divider({
  direction = 'horizontal',
  className,
}: DividerProps) {
  return (
    <div
      className={cn(
        'bg-border',
        direction === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
      role="separator"
      aria-orientation={direction === 'horizontal' ? 'horizontal' : 'vertical'}
    />
  )
}
