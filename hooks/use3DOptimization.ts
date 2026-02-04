/**
 * 3D Optimization Hook
 * Following Single Responsibility Principle - handles device capability detection
 * Optimizes 3D rendering based on device performance
 */

'use client';

import { useState, useEffect } from 'react';

interface DeviceCapabilities {
    isMobile: boolean;
    isLowPerformance: boolean;
    pixelRatio: number;
}

export function use3DOptimization(): DeviceCapabilities {
    const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
        isMobile: false,
        isLowPerformance: false,
        pixelRatio: 1,
    });

    useEffect(() => {
        const checkCapabilities = () => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );

            // Check for low performance indicators
            const isLowPerformance = isMobile || navigator.hardwareConcurrency <= 4;

            // Limit pixel ratio for performance
            const pixelRatio = Math.min(window.devicePixelRatio, isLowPerformance ? 1.5 : 2);

            setCapabilities({
                isMobile,
                isLowPerformance,
                pixelRatio,
            });
        };

        checkCapabilities();
        window.addEventListener('resize', checkCapabilities);

        return () => {
            window.removeEventListener('resize', checkCapabilities);
        };
    }, []);

    return capabilities;
}
