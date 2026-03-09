'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import ar from '@/locales/ar.json'
import en from '@/locales/en.json'

type Language = 'ar' | 'en'
type Translations = typeof ar

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  dir: 'rtl' | 'ltr'
  isArabic: boolean
}

const translations: Record<Language, Translations> = { ar, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar')
  const [mounted, setMounted] = useState(false)

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null
    if (savedLang === 'ar' || savedLang === 'en') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang)
    }
    setMounted(true)
  }, [])

  // Update document attributes when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    }
  }, [language, mounted])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }, [])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: language === 'ar' ? 'rtl' : 'ltr',
    isArabic: language === 'ar'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
