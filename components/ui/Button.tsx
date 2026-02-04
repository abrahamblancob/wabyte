/**
 * Button Component
 * Following Single Responsibility Principle - handles only button rendering
 * Following Open/Closed Principle - extensible via props
 * Following Liskov Substitution Principle - consistent interface
 */

'use client';

import { motion } from 'framer-motion';
import type { ButtonProps } from '@/types';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    href,
    className = '',
    type = 'button',
}: ButtonProps) {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 cursor-pointer inline-block text-center';

    const variantStyles = {
        primary: `bg-brand-blue text-brand-white hover:bg-opacity-90`,
        secondary: `bg-brand-cyan text-brand-dark hover:bg-opacity-90`,
        outline: `border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark`,
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const MotionComponent = motion.button;

    if (href) {
        return (
            <motion.a
                href={href}
                className={combinedStyles}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <MotionComponent
            type={type}
            onClick={onClick}
            className={combinedStyles}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {children}
        </MotionComponent>
    );
}
