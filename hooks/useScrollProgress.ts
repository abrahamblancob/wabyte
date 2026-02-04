/**
 * Scroll Progress Hook
 * Following Single Responsibility Principle - handles only scroll tracking
 */

'use client';

import { useState, useEffect } from 'react';
import type { ScrollProgress } from '@/types';

export function useScrollProgress(): ScrollProgress {
    const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
        progress: 0,
        direction: 'down',
    });

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = windowHeight > 0 ? currentScrollY / windowHeight : 0;
            const direction = currentScrollY > lastScrollY ? 'down' : 'up';

            setScrollProgress({ progress, direction });
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollProgress;
}
