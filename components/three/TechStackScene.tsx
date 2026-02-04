/**
 * Tech Stack Scene - High Fidelity Illustration
 * Uses a generated hyper-realistic image with interactive hotspots
 * FIXED: Tooltip appears NEXT to the hotspot (proximity)
 * FIXED: Hotspot indicators blink Cyan <-> Orange
 * FIXED: Added AI Models hotspot on the back
 * FIXED: Added Circuit Pattern Background
 */

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TECHNOLOGIES } from '@/lib/constants/content';

interface TechStackSceneProps {
    onHover: (tech: string | null) => void;
}

export function TechStackScene({ onHover }: TechStackSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
        onHover(null);
        setActiveHotspot(null);
    };

    const handleHotspotEnter = (spot: { id: string, tech: string }) => {
        onHover(spot.tech);
        setActiveHotspot(spot.id);
    };

    const handleHotspotLeave = () => {
        onHover(null);
        setActiveHotspot(null);
    };

    // Helper to get tech data
    const getTechData = (techName: string) => TECHNOLOGIES.find(t => t.name === techName);

    // Hotspots definitions
    const hotspots = [
        {
            id: 'ai',
            tech: 'Python',
            top: '50%', left: '55%', width: '12%', height: '30%',
            label: 'AI Core',
            position: 'right'
        },
        {
            id: 'ai-back',
            tech: 'AI Models',
            top: '40%', left: '58%', width: '10%', height: '20%',
            label: 'Neural Net',
            position: 'right'
        },
        {
            id: 'laptop',
            tech: 'React',
            top: '55%', left: '42%', width: '12%', height: '15%',
            label: 'Frontend',
            position: 'left'
        },
        {
            id: 'cloud',
            tech: 'Google Cloud',
            top: '20%', left: '72%', width: '15%', height: '20%',
            label: 'Cloud',
            position: 'left'
        },
        {
            id: 'server',
            tech: 'Node.js',
            top: '40%', left: '78%', width: '12%', height: '35%',
            label: 'Backend',
            position: 'left'
        },
        {
            id: 'analytics',
            tech: 'TypeScript',
            top: '25%', left: '25%', width: '20%', height: '25%',
            label: 'Logic',
            position: 'right'
        }
    ];

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden flex items-center justify-center perspective-1000 bg-[#002b6b]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* BACKGROUND LAYERS */}

            {/* 1. Base Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(circle at center, #053b87 0%, #001f4d 100%)'
                }}
            />

            {/* 2. Circuit Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L30 10 L30 30 L50 30 M70 10 L90 10 M10 50 L30 50 L50 70 L90 70 M10 90 L30 90' stroke='%2340e0d0' stroke-width='1' fill='none'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%2340e0d0'/%3E%3Ccircle cx='50' cy='70' r='2' fill='%2340e0d0'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px'
            }} />

            {/* 2. INTERACTIVE CONTENT */}
            <motion.div
                className="relative z-10 h-full aspect-square m-auto"
                animate={{
                    rotateX: mousePos.y * 2,
                    rotateY: mousePos.x * -2,
                    scale: 1.0
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/tech-stack.png"
                        alt="High Fidelity Tech Stack"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                        quality={100}
                    />

                    {hotspots.map((spot) => {
                        const techData = getTechData(spot.tech);
                        const isActive = activeHotspot === spot.id;

                        return (
                            <div
                                key={spot.id}
                                className="absolute z-20 group flex items-center justify-center"
                                style={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height }}
                                onMouseEnter={() => handleHotspotEnter(spot)}
                                onMouseLeave={handleHotspotLeave}
                            >
                                {/* Visual Indicator - Blinking Cyan/Orange */}
                                {!isActive && (
                                    <>
                                        <motion.div
                                            className="absolute w-3 h-3 rounded-full"
                                            animate={{
                                                backgroundColor: ['#40e0d0', '#ffaa00', '#40e0d0'], // Cyan -> Orange -> Cyan
                                                boxShadow: [
                                                    '0 0 10px rgba(64, 224, 208, 0.6)',
                                                    '0 0 20px rgba(255, 170, 0, 0.9)',
                                                    '0 0 10px rgba(64, 224, 208, 0.6)'
                                                ]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <div className="absolute w-full h-full border border-brand-cyan/0 rounded-lg group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/5 transition-all duration-300 cursor-pointer" />
                                    </>
                                )}

                                {/* TOOLTIP CARD */}
                                <AnimatePresence>
                                    {isActive && techData && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, x: spot.position === 'left' ? 20 : -20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                            className={`absolute w-64 md:w-72 bg-brand-dark/95 backdrop-blur-xl border border-brand-cyan p-4 rounded-xl shadow-[0_0_30px_rgba(64,224,208,0.3)] z-50 pointer-events-none
                                ${spot.position === 'left' ? 'right-full mr-4' : 'left-full ml-4'}
                                top-1/2 -translate-y-1/2
                            `}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(64,224,208,0.8)]" />
                                                <h3 className="text-xl font-bold text-brand-white">{techData.name}</h3>
                                            </div>
                                            <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-mono text-brand-dark bg-brand-cyan rounded uppercase tracking-wider">
                                                {techData.category}
                                            </span>
                                            <p className="text-brand-gray text-xs leading-relaxed">
                                                Componente esencial de nuestra arquitectura digital.
                                            </p>

                                            <div className={`absolute top-1/2 w-4 h-[1px] bg-brand-cyan
                                ${spot.position === 'left' ? 'left-full' : 'right-full'}
                             `} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 pointer-events-none z-10" />
        </div>
    );
}
