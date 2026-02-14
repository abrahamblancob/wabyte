/**
 * Contact Form Component
 * Form with name, last name, email, and idea text box
 * Submission via WhatsApp
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import type { ContactFormData } from '@/types';

const WHATSAPP_NUMBER = '584142994143';

const initialFormData: ContactFormData = {
    nombre: '',
    apellido: '',
    email: '',
    idea: '',
};

export function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }
        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'El correo es requerido';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Ingresa un correo válido';
        }
        if (!formData.idea.trim()) {
            newErrors.idea = 'Cuéntanos tu idea';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const buildWhatsAppMessage = (): string => {
        const message = `¡Hola! Soy *${formData.nombre} ${formData.apellido}*.\n\nCorreo: ${formData.email}\n\nMi idea:\n${formData.idea}`;
        return encodeURIComponent(message);
    };

    const handleSubmitWhatsApp = () => {
        if (!validate()) return;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
        window.open(url, '_blank');
    };

    const inputClassName = 'w-full px-4 py-3 bg-brand-dark bg-opacity-50 border border-brand-cyan border-opacity-30 rounded-lg text-brand-white placeholder-brand-cyan placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 transition-all';

    return (
        <div className="w-full max-w-2xl mx-auto text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Nombre */}
                <div>
                    <motion.input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className={inputClassName}
                        whileFocus={{ scale: 1.01 }}
                        aria-label="Nombre"
                    />
                    {errors.nombre && (
                        <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                    )}
                </div>

                {/* Apellido */}
                <div>
                    <motion.input
                        type="text"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                        className={inputClassName}
                        whileFocus={{ scale: 1.01 }}
                        aria-label="Apellido"
                    />
                    {errors.apellido && (
                        <p className="text-red-400 text-sm mt-1">{errors.apellido}</p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="mb-4">
                <motion.input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClassName}
                    whileFocus={{ scale: 1.01 }}
                    aria-label="Correo electrónico"
                />
                {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            {/* Idea */}
            <div className="mb-6">
                <motion.textarea
                    placeholder="Cuéntanos tu idea de negocio o proyecto..."
                    value={formData.idea}
                    onChange={(e) => {
                        if (e.target.value.length <= 1000) {
                            setFormData({ ...formData, idea: e.target.value });
                        }
                    }}
                    rows={5}
                    className={`${inputClassName} resize-none`}
                    whileFocus={{ scale: 1.01 }}
                    aria-label="Tu idea"
                />
                <div className="flex justify-between mt-1">
                    {errors.idea ? (
                        <p className="text-red-400 text-sm">{errors.idea}</p>
                    ) : (
                        <span />
                    )}
                    <span className="text-brand-cyan text-opacity-50 text-sm">
                        {formData.idea.length}/1000
                    </span>
                </div>
            </div>

            {/* Button */}
            <div className="flex justify-center">
                <Button type="button" variant="primary" size="md" onClick={handleSubmitWhatsApp}>
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Enviar por WhatsApp
                    </span>
                </Button>
            </div>
        </div>
    );
}
