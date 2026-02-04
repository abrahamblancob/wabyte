/**
 * Technologies Section
 * Interactive technology stack display
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { TECHNOLOGIES } from '@/lib/constants/content';

// Dynamic import for 3D component to avoid SSR issues
const TechStackScene = dynamic(() => import('@/components/three/TechStackScene').then(mod => ({ default: mod.TechStackScene })), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] flex items-center justify-center text-brand-cyan/50">Cargando visualización 3D...</div>
});

export function TechnologiesSection() {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const activeTechData = hoveredTech ? TECHNOLOGIES.find(t => t.name === hoveredTech) : null;

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
                        Stack Tecnológico
                    </h2>
                    <p className="text-xl text-brand-cyan max-w-2xl mx-auto">
                        Herramientas modernas para soluciones escalables
                    </p>
                </motion.div>

                <div className="relative">
                    {/* 3D Scene - Enhanced interactive visualization */}
                    <div className="hidden md:block w-full h-[600px] bg-gradient-to-b from-transparent to-brand-dark/20 rounded-xl overflow-hidden border border-brand-cyan/10 relative">
                        <TechStackScene onHover={setHoveredTech} />

                        {/* Instruction hint */}
                        {!hoveredTech && (
                            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none opacity-50">
                                <span className="text-brand-cyan text-sm tracking-widest uppercase">Interactúa con el stack</span>
                            </div>
                        )}
                    </div>

                    {/* Tooltip Overlay */}
                    <AnimatePresence>
                        {hoveredTech && activeTechData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-20 right-10 md:right-20 pointer-events-none z-20 max-w-xs"
                            >
                                <div className="bg-brand-dark/90 backdrop-blur-md border border-brand-cyan p-6 rounded-lg shadow-[0_0_30px_rgba(64,224,208,0.3)]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-3 h-3 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(64,224,208,0.8)]" />
                                        <h3 className="text-2xl font-bold text-brand-white">{activeTechData.name}</h3>
                                    </div>
                                    <span className="inline-block px-2 py-1 mb-3 text-xs font-mono text-brand-dark bg-brand-cyan rounded">
                                        {activeTechData.category}
                                    </span>
                                    <p className="text-brand-gray text-sm leading-relaxed">
                                        Tecnología clave de nuestro stack para construir soluciones robustas y escalables.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

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
