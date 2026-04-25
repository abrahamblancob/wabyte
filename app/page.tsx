/**
 * Main Landing Page
 *
 * Server Component: renders all section content statically at build time so
 * Googlebot (and other crawlers / preview cards) receive a fully populated
 * HTML document on first response. The Three.js wave background is the only
 * piece kept client-only because it needs `window` / WebGL.
 */

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ValuePropositionSection } from '@/components/sections/ValuePropositionSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import { Navbar } from '@/components/ui/Navbar';
// VanillaScene is a 'use client' component; Three.js setup runs inside
// useEffect, so SSR safely renders an empty backdrop div.
import { VanillaScene } from '@/components/three/VanillaScene';

export default function Home() {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <VanillaScene />

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
