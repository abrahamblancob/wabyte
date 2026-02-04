/**
 * Main Landing Page
 * Assembles all sections with dynamic loading to prevent SSR issues
 */

'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import all client components with ssr: false
// const Scene = dynamic(() => import('@/components/three/Scene').then(mod => ({ default: mod.Scene })), {
//   ssr: false,
//   loading: () => (
//     <div className="fixed inset-0 -z-10 bg-brand-dark">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
//       </div>
//     </div>
//   ),
// });

const HeroSection = dynamic(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), { ssr: false });
const ValuePropositionSection = dynamic(() => import('@/components/sections/ValuePropositionSection').then(mod => ({ default: mod.ValuePropositionSection })), { ssr: false });
const TechnologiesSection = dynamic(() => import('@/components/sections/TechnologiesSection').then(mod => ({ default: mod.TechnologiesSection })), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), { ssr: false });
const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });
const VanillaScene = dynamic(() => import('@/components/three/VanillaScene').then(mod => ({ default: mod.VanillaScene })), { ssr: false });
const Navbar = dynamic(() => import('@/components/ui/Navbar').then(mod => ({ default: mod.Navbar })), { ssr: false });

export default function Home() {
    return (
        <main className="relative min-h-screen">
            {/* Navigation Bar */}
            <Navbar />

            {/* 3D Wave Background using Vanilla Three.js */}
            <VanillaScene />

            {/* Landing Page Sections */}
            <div id="inicio">
                <HeroSection />
            </div>
            <div id="servicios">
                <ServicesSection />
            </div>
            <div id="propuesta">
                <ValuePropositionSection />
            </div>
            <div id="tecnologias">
                <TechnologiesSection />
            </div>
            <div id="contacto">
                <CTASection />
            </div>
            <Footer />
        </main>
    );
}
