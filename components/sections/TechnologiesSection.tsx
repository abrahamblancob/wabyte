/**
 * Technologies Section
 * Interactive technology stack display
 */

'use client';

import { motion } from 'framer-motion';
import { TECHNOLOGIES } from '@/lib/constants/content';

export function TechnologiesSection() {
    const categories = Array.from(new Set(TECHNOLOGIES.map(tech => tech.category)));

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

                <div className="space-y-12">
                    {categories.map((category, categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                        >
                            <h3 className="text-2xl font-bold text-brand-cyan mb-6 text-center">
                                {category}
                            </h3>

                            <div className="flex flex-wrap justify-center gap-4">
                                {TECHNOLOGIES.filter(tech => tech.category === category).map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: 'rgba(64, 224, 208, 0.1)',
                                        }}
                                        className="px-6 py-3 bg-brand-dark bg-opacity-50 border border-brand-cyan border-opacity-30 rounded-lg text-brand-white font-mono cursor-pointer transition-all"
                                    >
                                        {tech.name}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
