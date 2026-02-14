/**
 * Footer Component
 * Site footer with links and social media
 */

'use client';

import { motion } from 'framer-motion';
import { FOOTER_CONTENT } from '@/lib/constants/content';

const socialIcons = {
    instagram: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    ),
};

export function Footer() {
    return (
        <footer className="py-12 border-t border-brand-cyan border-opacity-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-brand-white mb-2">wabyte</h3>
                        <p className="text-brand-cyan text-opacity-80">
                            {FOOTER_CONTENT.tagline}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-brand-white mb-4">Enlaces</h4>
                        <ul className="space-y-2">
                            {FOOTER_CONTENT.links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-brand-cyan text-opacity-80 hover:text-opacity-100 transition-all"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-semibold text-brand-white mb-4">Síguenos</h4>
                        <div className="flex gap-4">
                            {FOOTER_CONTENT.social.map((social) => (
                                <motion.a
                                    key={social.platform}
                                    href={social.href}
                                    className="text-brand-cyan hover:text-brand-blue transition-colors"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.platform}
                                >
                                    {socialIcons[social.icon as keyof typeof socialIcons]}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-brand-cyan border-opacity-20 pt-8 text-center">
                    <p className="text-brand-cyan text-opacity-60">
                        {FOOTER_CONTENT.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
