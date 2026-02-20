/**
 * Technologies Section
 * Interactive technology stack display
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { TECHNOLOGIES } from '@/lib/constants/content';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Dynamic import for 3D component to avoid SSR issues
const TechStackScene = dynamic(() => import('@/components/three/TechStackScene').then(mod => ({ default: mod.TechStackScene })), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] flex items-center justify-center text-brand-cyan/50" />,
});

export function TechnologiesSection() {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const { t } = useLanguage();

    return (
        <section id="tecnologias" className="py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">
                        {t.technologies.heading}
                    </h2>
                    <p className="text-xl text-brand-cyan max-w-2xl mx-auto">
                        {t.technologies.subheading}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* 3D Scene - Enhanced interactive visualization */}
                    <div className="hidden md:block w-full h-[600px] bg-gradient-to-b from-transparent to-brand-dark/20 rounded-xl overflow-hidden border border-brand-cyan/10 relative">
                        <TechStackScene onHover={setHoveredTech} />
                    </div>

                    {/* Instruction hint */}
                    {!hoveredTech && (
                        <div className="mt-4 text-center pointer-events-none opacity-60">
                            <span className="text-brand-cyan text-sm tracking-widest uppercase animate-pulse">
                                {t.technologies.hint}
                            </span>
                        </div>
                    )}

                    {/* Mobile Grid Fallback */}
                    <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
                        {TECHNOLOGIES.map((tech) => (
                            <div key={tech.name} className="p-4 bg-brand-dark border border-brand-cyan/20 rounded-lg text-center">
                                <div className="text-brand-white font-bold mb-1">{tech.name}</div>
                                <div className="text-brand-cyan text-xs opacity-70">{tech.category}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
