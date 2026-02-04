/**
 * Card Component
 * Following Single Responsibility Principle - handles only card container
 * With optional tilt effect on hover
 */

'use client';

import { motion } from 'framer-motion';
import type { CardProps } from '@/types';

export function Card({ children, className = '', hoverable = true }: CardProps) {
    const baseStyles = 'bg-brand-dark bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-brand-cyan border-opacity-20';
    const combinedStyles = `${baseStyles} ${className}`;

    if (!hoverable) {
        return <div className={combinedStyles}>{children}</div>;
    }

    return (
        <motion.div
            className={combinedStyles}
            whileHover={{
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 },
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    );
}
