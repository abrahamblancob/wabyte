/**
 * Contact Form Component
 * Minimalist email capture form with validation
 */

'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import type { ContactFormData } from '@/types';

export function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({ email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!formData.email) {
            setError('Por favor ingresa tu email');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Por favor ingresa un email válido');
            return;
        }

        // TODO: Integrate with actual API
        console.log('Form submitted:', formData);
        setSuccess(true);
        setFormData({ email: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
                <motion.input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ email: e.target.value })}
                    className="flex-1 px-6 py-3 bg-brand-dark bg-opacity-50 border border-brand-cyan border-opacity-30 rounded-lg text-brand-white placeholder-brand-cyan placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 transition-all"
                    whileFocus={{ scale: 1.02 }}
                    aria-label="Email address"
                />
                <Button type="submit" variant="primary" size="md">
                    Enviar
                </Button>
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                >
                    {error}
                </motion.p>
            )}

            {success && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-brand-cyan text-sm mt-2"
                >
                    ¡Gracias! Te contactaremos pronto.
                </motion.p>
            )}
        </form>
    );
}
