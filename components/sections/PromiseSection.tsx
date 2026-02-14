/**
 * Promise Section
 * Highlights the concrete promise / time commitment to clients
 */

'use client';

import { motion } from 'framer-motion';
import { PROMISE_CONTENT } from '@/lib/constants/content';

export function PromiseSection() {
    return (
        <section className="py-32 relative bg-brand-dark bg-opacity-40">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-8">
                        {PROMISE_CONTENT.headline}
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 rounded-2xl blur-xl" />
                        <div className="relative border border-brand-cyan/30 rounded-2xl p-10 md:p-14 backdrop-blur-sm">
                            <p className="text-2xl md:text-3xl text-brand-cyan font-light leading-relaxed">
                                {PROMISE_CONTENT.promise}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
