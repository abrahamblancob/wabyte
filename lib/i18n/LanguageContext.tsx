'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { es } from './translations/es';
import { en } from './translations/en';

export type Locale = 'es' | 'en';
export type Translations = typeof es;

const dictionaries: Record<Locale, Translations> = { es, en };

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'es',
    setLocale: () => {},
    t: es,
});

function getInitialLocale(): Locale {
    if (typeof window === 'undefined') return 'es';
    const saved = localStorage.getItem('wabyte-lang') as Locale | null;
    if (saved && (saved === 'es' || saved === 'en')) return saved;
    return navigator.language.startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('es');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setLocaleState(getInitialLocale());
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('wabyte-lang', locale);
        document.documentElement.lang = locale;
    }, [locale, mounted]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
