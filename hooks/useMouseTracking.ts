/**
 * Mouse Tracking Hook
 * Following Single Responsibility Principle - handles only mouse position tracking
 * Following Dependency Inversion Principle - components depend on this abstraction
 */

'use client';

import { useState, useEffect } from 'react';
import type { MousePosition } from '@/types';

export function useMouseTracking(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize to -1 to 1 range for easier use in 3D
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return mousePosition;
}
