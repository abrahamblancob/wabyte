/**
 * Hero Section
 * Full viewport section with 3D waves background and logo reveal
 */

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { HERO_CONTENT } from '@/lib/constants/content';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-6 z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-brand-white mb-6 leading-tight"
                >
                    {HERO_CONTENT.headline}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-brand-cyan mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    {HERO_CONTENT.subheadline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Button href="#contacto" variant="primary" size="lg">
                        {HERO_CONTENT.cta}
                    </Button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-brand-cyan rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div className="w-1 h-2 bg-brand-cyan rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
