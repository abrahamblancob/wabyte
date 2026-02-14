/**
 * Clients Page
 * Showcases wabyte's clients and the SaaS solutions built for them
 */

'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/ui/Navbar').then(mod => ({ default: mod.Navbar })), { ssr: false });
const ClientsSection = dynamic(() => import('@/components/sections/ClientsSection').then(mod => ({ default: mod.ClientsSection })), { ssr: false });
const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });
const VanillaScene = dynamic(() => import('@/components/three/VanillaScene').then(mod => ({ default: mod.VanillaScene })), { ssr: false });

export default function ClientesPage() {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <VanillaScene />
            <ClientsSection />
            <Footer />
        </main>
    );
}
