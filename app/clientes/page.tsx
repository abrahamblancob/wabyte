/**
 * Clients Page
 *
 * Server Component: pre-renders the clients section content at build time
 * so the page ships HTML with real text/headings to crawlers. Three.js
 * background remains client-only.
 */

import { Navbar } from '@/components/ui/Navbar';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { Footer } from '@/components/sections/Footer';
import { VanillaScene } from '@/components/three/VanillaScene';

export const metadata = {
    title: 'Clientes',
    description: 'Empresas que confían en wabyte para sus soluciones SaaS: Rhino Toyo Parts, Picking Brothers, DDDare y más.',
    alternates: { canonical: '/clientes' },
};

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
