'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Home,
  Settings,
  Menu,
  X,
  Plus,
} from 'lucide-react'

/**
 * Navigation Components
 * 
 * Design System compliant navigation with
 * responsive design and accessibility.
 * 
 * @see design-system/v0-clone/COMPONENTS.md
 */

// ============================================
// NAV LINK
// ============================================

export interface NavLinkProps {
  href: string
  children: React.ReactNode
  /** Icon to display */
  icon?: React.ReactNode
  /** Active state */
  active?: boolean
  /** Additional className */
  className?: string
}

export function NavLink({
  href,
  children,
  icon,
  active,
  className,
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = active ?? pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        'text-sm font-medium',
        'transition-colors duration-200',
        isActive
          ? 'bg-surface text-text'
          : 'text-muted hover:text-text hover:bg-surface/50',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </Link>
  )
}

// ============================================
// NAVIGATION BAR
// ============================================

export interface NavBarProps {
  children?: React.ReactNode
  /** Logo element */
  logo?: React.ReactNode
  /** Right side content */
  rightContent?: React.ReactNode
  /** Additional className */
  className?: string
}

export function NavBar({
  children,
  logo,
  rightContent,
  className,
}: NavBarProps) {
  return (
    <nav
      className={cn(
        'flex items-center justify-between h-16',
        'px-4 sm:px-6 lg:px-8',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-6">
        {logo}
        <div className="hidden md:flex items-center gap-1">
          {children}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {rightContent}
      </div>
    </nav>
  )
}

// ============================================
// MOBILE NAV
// ============================================

export interface MobileNavProps {
  children?: React.ReactNode
  /** Trigger button content */
  trigger?: React.ReactNode
  /** Open state */
  open?: boolean
  /** Open change handler */
  onOpenChange?: (open: boolean) => void
}

export function MobileNav({
  children,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: MobileNavProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = onOpenChange ?? setUncontrolledOpen

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className={cn(
              'fixed top-16 right-0 bottom-0 left-0 z-50',
              'bg-background border-t border-border',
              'p-4',
              'animate-in slide-in-from-top-2 duration-200'
            )}
          >
            <nav className="flex flex-col gap-2">
              {children}
            </nav>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================
// BREADCRUMBS
// ============================================

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  /** Additional className */
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn('flex items-center gap-2 text-sm', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-muted" aria-hidden="true">/</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted hover:text-text transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ============================================
// TABS NAV
// ============================================

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface TabsNavProps {
  tabs: TabItem[]
  /** Active tab ID */
  activeTab: string
  /** Tab change handler */
  onTabChange: (tabId: string) => void
  /** Additional className */
  className?: string
}

export function TabsNav({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabsNavProps) {
  return (
    <nav
      className={cn(
        'flex items-center gap-1 p-1',
        'bg-surface rounded-lg',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md',
            'text-sm font-medium',
            'transition-colors duration-200',
            'cursor-pointer',
            activeTab === tab.id
              ? 'bg-background text-text shadow-sm'
              : 'text-muted hover:text-text'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

// ============================================
// SKIP LINK
// ============================================

export interface SkipLinkProps {
  /** Target element ID */
  targetId: string
  /** Link text */
  text?: string
}

export function SkipLink({
  targetId,
  text = 'Skip to main content',
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:top-4 focus:left-4 focus:z-[9999]',
        'focus:px-4 focus:py-2',
        'focus:bg-surface focus:text-text',
        'focus:rounded-lg focus:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-cta'
      )}
    >
      {text}
    </a>
  )
}
