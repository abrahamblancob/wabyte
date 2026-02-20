/**
 * Value Proposition Section
 * Showcases key value propositions with metrics
 */

'use client';

import { motion } from 'framer-motion';
import { METRICS } from '@/lib/constants/content';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function ValuePropositionSection() {
    const { t } = useLanguage();

    return (
        <section className="py-32 relative bg-brand-dark bg-opacity-30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-12">
                        {t.valueProposition.heading}
                    </h2>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {t.valueProposition.propositions.map((proposition, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="text-2xl md:text-3xl text-brand-cyan font-light leading-relaxed"
                            >
                                {proposition}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto mt-20"
                >
                    <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-brand-blue mb-2">
                            {METRICS.experience}
                        </div>
                        <div className="text-xl text-brand-cyan">{t.valueProposition.metrics.experience}</div>
                    </div>

                    <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-brand-blue mb-2">
                            {METRICS.projects}
                        </div>
                        <div className="text-xl text-brand-cyan">{t.valueProposition.metrics.projects}</div>
                    </div>

                    <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-brand-blue mb-2">
                            {METRICS.technologies}
                        </div>
                        <div className="text-xl text-brand-cyan">{t.valueProposition.metrics.technologies}</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
