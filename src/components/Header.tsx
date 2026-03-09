'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { CandlestickChart, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'

const portalUrl = 'https://infinityalgoacademy.net/portal/'

export function Header() {
  const { t, language, setLanguage, isArabic } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: t.nav.home, href: '#' },
    { label: t.nav.products, href: portalUrl },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-amber-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <CandlestickChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gold-gradient">InfinityAlgoPower</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-muted-foreground hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="relative w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-300"
              title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <Globe className="w-5 h-5 text-amber-500" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-amber-500 text-background rounded-full w-4 h-4 flex items-center justify-center">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </Button>
            
            {/* CTA Button - Desktop */}
            <Button
              className="hidden md:flex btn-gold text-sm font-semibold"
              onClick={() => window.open(portalUrl, '_blank')}
            >
              {t.nav.startNow}
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-500" />
              ) : (
                <Menu className="w-5 h-5 text-amber-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-500/10">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="px-4 py-3 rounded-lg text-muted-foreground hover:text-amber-400 hover:bg-amber-500/10 transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="btn-gold text-sm font-semibold mt-2"
                onClick={() => {
                  window.open(portalUrl, '_blank')
                  setMobileMenuOpen(false)
                }}
              >
                {t.nav.startNow}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
