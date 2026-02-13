'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PromptInput, SuggestionChips, type SuggestionChip } from '@/components/ui/prompt-input'
import { Card } from '@/components/ui/card'
import { AppLayout } from '@/components/layout/app-layout'
import { NavBar, NavLink, MobileNav, SkipLink } from '@/components/layout/app-nav'
import {
  Sparkles,
  Github,
  ExternalLink,
  Info,
  Layout,
  BarChart3,
  Palette,
  FileText,
} from 'lucide-react'

/**
 * Home Page Component
 * 
 * Design System compliant home page with
 * prompt input, suggestions, and responsive design.
 * 
 * @see design-system/v0-clone/pages/home.md
 */

// Default suggestions
const DEFAULT_SUGGESTIONS: SuggestionChip[] = [
  { id: '1', text: 'Build a landing page', icon: <Layout className="w-4 h-4" /> },
  { id: '2', text: 'Create a dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { id: '3', text: 'Design a portfolio', icon: <Palette className="w-4 h-4" /> },
  { id: '4', text: 'Make a blog', icon: <FileText className="w-4 h-4" /> },
]

export interface HomePageProps {
  /** User session */
  session?: any
  /** Initial prompt value */
  initialPrompt?: string
  /** Submit handler */
  onSubmit?: (prompt: string) => void
  /** Loading state */
  isLoading?: boolean
}

export function HomePage({
  session,
  initialPrompt = '',
  onSubmit,
  isLoading = false,
}: HomePageProps) {
  const [prompt, setPrompt] = React.useState(initialPrompt)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !isLoading) {
      onSubmit?.(prompt.trim())
    }
  }

  const handleSuggestionClick = (suggestion: SuggestionChip) => {
    setPrompt(suggestion.text)
  }

  return (
    <>
      {/* Skip Link for Accessibility */}
      <SkipLink targetId="main-content" />

      <AppLayout
        showHeader={true}
        headerContent={
          <NavBar
            logo={
              <Link
                href="/"
                className="text-lg font-semibold text-text hover:text-cta transition-colors"
              >
                v0 Clone
              </Link>
            }
            rightContent={
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <Link href="/about">
                      <Info className="w-4 h-4" />
                      What's This?
                    </Link>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a
                      href="https://github.com/vercel/v0-sdk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a
                      href="https://vercel.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Deploy
                    </a>
                  </Button>
                </div>

                {/* User Navigation */}
                {session ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted hidden sm:block">
                      {session.user?.email}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/api/auth/signout">Sign out</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button variant="primary" size="sm" asChild>
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                )}

                {/* Mobile Menu */}
                <MobileNav
                  open={mobileMenuOpen}
                  onOpenChange={setMobileMenuOpen}
                >
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/chats">My Chats</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <div className="border-t border-border my-2" />
                  {session ? (
                    <NavLink href="/api/auth/signout">Sign out</NavLink>
                  ) : (
                    <>
                      <NavLink href="/login">Sign in</NavLink>
                      <NavLink href="/register">Sign up</NavLink>
                    </>
                  )}
                </MobileNav>
              </>
            }
          />
        }
        mainClassName="flex flex-col"
      >
        {/* Main Content */}
        <main
          id="main-content"
          className="flex-1 flex flex-col items-center justify-center px-4 py-12"
        >
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
              What can we build together?
            </h1>
            <p className="text-lg text-muted max-w-md mx-auto">
              Describe your idea and watch it come to life with AI-powered code generation.
            </p>
          </div>

          {/* Prompt Input */}
          <div className="w-full max-w-2xl mb-8">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="Describe what you want to build..."
            />
          </div>

          {/* Suggestions */}
          <SuggestionChips
            suggestions={DEFAULT_SUGGESTIONS}
            onClick={handleSuggestionClick}
            className="max-w-2xl"
          />

          {/* Features Section (Optional) */}
          <div className="mt-16 md:mt-24 w-full max-w-5xl">
            <h2 className="text-xl font-semibold text-text text-center mb-8">
              Powered by AI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass" hoverable className="text-center">
                <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-cta" />
                </div>
                <h3 className="font-semibold text-text mb-2">AI Generation</h3>
                <p className="text-sm text-muted">
                  Generate production-ready React components from natural language descriptions.
                </p>
              </Card>
              <Card variant="glass" hoverable className="text-center">
                <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-4">
                  <Layout className="w-6 h-6 text-cta" />
                </div>
                <h3 className="font-semibold text-text mb-2">Live Preview</h3>
                <p className="text-sm text-muted">
                  See your generated code in action with real-time preview and iteration.
                </p>
              </Card>
              <Card variant="glass" hoverable className="text-center">
                <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 text-cta" />
                </div>
                <h3 className="font-semibold text-text mb-2">One-Click Deploy</h3>
                <p className="text-sm text-muted">
                  Deploy your generated apps instantly to Vercel with a single click.
                </p>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">
              © 2024 v0 Clone. Built with Next.js and v0 SDK.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-text transition-colors"
              >
                v0.dev
              </a>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-text transition-colors"
              >
                Vercel
              </a>
              <a
                href="https://github.com/vercel/v0-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-text transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </AppLayout>
    </>
  )
}

export default HomePage
