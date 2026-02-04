/**
 * CTA Section
 * Final call-to-action with contact form
 */

'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ui/ContactForm';
import { CTA_CONTENT } from '@/lib/constants/content';

export function CTASection() {
    return (
        <section id="contacto" className="py-32 relative bg-brand-dark bg-opacity-30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-6">
                        {CTA_CONTENT.headline}
                    </h2>

                    <p className="text-xl text-brand-cyan mb-12 leading-relaxed">
                        {CTA_CONTENT.subheadline}
                    </p>

                    <ContactForm />
                </motion.div>
            </div>
        </section>
    );
}
