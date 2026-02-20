/**
 * Navigation Bar Component
 * Sticky top navigation with links to all sections and language selector
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { t, locale, setLocale } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: t.nav.inicio, href: '/#inicio' },
        { label: t.nav.servicios, href: '/#servicios' },
        { label: t.nav.propuesta, href: '/#propuesta' },
        { label: t.nav.tecnologias, href: '/#tecnologias' },
        { label: t.nav.clientes, href: '/clientes' },
        { label: t.nav.contacto, href: '/#contacto' },
    ];

    const toggleLocale = () => {
        setLocale(locale === 'es' ? 'en' : 'es');
    };

    const LanguageToggle = () => (
        <button
            onClick={toggleLocale}
            className="flex items-center gap-1 text-sm font-semibold rounded-md px-2 py-1 border border-brand-cyan border-opacity-30 hover:border-opacity-100 transition-all"
            aria-label="Change language"
        >
            <span className={locale === 'es' ? 'text-brand-cyan' : 'text-brand-white text-opacity-50'}>ES</span>
            <span className="text-brand-white text-opacity-30">|</span>
            <span className={locale === 'en' ? 'text-brand-cyan' : 'text-brand-white text-opacity-50'}>EN</span>
        </button>
    );

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-brand-blue/10'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center gap-3 text-2xl font-bold text-brand-white hover:text-brand-cyan transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src="/logo-transparent.png" alt="Wabyte Logo" className="w-10 h-10 object-contain" />
                        <span>wabyte</span>
                    </motion.a>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="text-brand-white hover:text-brand-cyan transition-colors relative group"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                        <LanguageToggle />
                    </div>

                    {/* Mobile: Language toggle + Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <LanguageToggle />
                        <button className="text-brand-white hover:text-brand-cyan transition-colors">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
