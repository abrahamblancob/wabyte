/**
 * Brand Constants
 * Following Open/Closed Principle - Configuration is centralized and extensible
 */

export const COLORS = {
    blue: '#0055ff',
    cyan: '#40e0d0',
    dark: '#2b2b2b',
    white: '#ffffff',
} as const;

export const TYPOGRAPHY = {
    fonts: {
        heading: 'var(--font-inter)',
        body: 'var(--font-inter)',
        code: 'var(--font-fira-code)',
    },
    sizes: {
        hero: '4.5rem',
        h1: '3.5rem',
        h2: '2.5rem',
        h3: '1.875rem',
        body: '1.125rem',
        small: '0.875rem',
    },
} as const;

export const ANIMATION = {
    durations: {
        fast: 200,
        normal: 300,
        slow: 500,
        logoReveal: 3000,
    },
    easing: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
} as const;

export const SPACING = {
    section: {
        mobile: '80px',
        tablet: '120px',
        desktop: '200px',
    },
} as const;

export const BRAND_NAME = 'wabyte';
export const TAGLINE = 'Ingeniería Fluida para Negocios Digitales';
