/**
 * Clients Section
 * Displays client cards with their SaaS features
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CLIENTS, CLIENTS_CONTENT } from '@/lib/constants/content';

const featureIcons: Record<string, React.ReactNode> = {
    vision: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
    hub: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    ),
};

export function ClientsSection() {
    return (
        <section className="pt-32 pb-20 relative">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">
                        {CLIENTS_CONTENT.headline}
                    </h1>
                    <p className="text-xl text-brand-cyan max-w-2xl mx-auto">
                        {CLIENTS_CONTENT.subheadline}
                    </p>
                </motion.div>

                {/* Client Cards */}
                <div className="flex flex-col gap-16">
                    {CLIENTS.map((client, clientIndex) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: clientIndex * 0.2 }}
                        >
                            {/* Client Card */}
                            <div
                                className="rounded-2xl overflow-hidden border border-opacity-30"
                                style={{ borderColor: client.brandColorLight }}
                            >
                                {/* Client Header */}
                                <div
                                    className="p-8 flex flex-col md:flex-row items-center gap-6"
                                    style={{
                                        background: `linear-gradient(135deg, ${client.brandColor}20, ${client.brandColorLight}10)`,
                                    }}
                                >
                                    <div
                                        className="w-24 h-24 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                                        style={{ backgroundColor: '#ffffff' }}
                                    >
                                        <img
                                            src={client.logo}
                                            alt={`${client.name} logo`}
                                            className="w-20 h-20 object-contain"
                                        />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h2
                                            className="text-3xl font-bold mb-2"
                                            style={{ color: client.brandColorLight }}
                                        >
                                            {client.name}
                                        </h2>
                                        <p className="text-brand-white text-opacity-80 text-lg max-w-2xl">
                                            {client.description}
                                        </p>
                                        <a
                                            href={client.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-3 text-sm font-medium transition-colors hover:underline"
                                            style={{ color: client.brandColorLight }}
                                        >
                                            Visitar sitio web
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="p-8 bg-brand-dark bg-opacity-60 backdrop-blur-sm">
                                    <h3 className="text-xl font-semibold text-brand-white mb-6">
                                        Servicios SaaS desarrollados
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {client.features.map((feature, featureIndex) => (
                                            <motion.div
                                                key={feature.name}
                                                initial={{ opacity: 0, x: featureIndex % 2 === 0 ? -20 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: 0.4 + featureIndex * 0.15 }}
                                                className="rounded-xl p-6 border border-opacity-20 transition-all duration-300 hover:border-opacity-40"
                                                style={{
                                                    borderColor: client.brandColorLight,
                                                    background: `linear-gradient(135deg, ${client.brandColor}15, transparent)`,
                                                }}
                                            >
                                                <div
                                                    className="mb-4"
                                                    style={{ color: client.brandColorLight }}
                                                >
                                                    {featureIcons[feature.icon] || featureIcons.vision}
                                                </div>
                                                <h4
                                                    className="text-xl font-bold mb-3"
                                                    style={{ color: client.brandColorLight }}
                                                >
                                                    {feature.name}
                                                </h4>
                                                <p className="text-brand-white text-opacity-75 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al inicio
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
