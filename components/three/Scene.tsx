/**
 * 3D Scene Component
 * Main container for all 3D elements with optimized settings
 */

'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { WaveGeometry } from './WaveGeometry';
import { ParticleSystem } from './ParticleSystem';
import { Logo3D } from './Logo3D';
import { use3DOptimization } from '@/hooks/use3DOptimization';
import { useMouseTracking } from '@/hooks/useMouseTracking';

export function Scene() {
    const [mounted, setMounted] = useState(false);
    const { isMobile, isLowPerformance, pixelRatio } = use3DOptimization();
    const mousePosition = useMouseTracking();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed inset-0 -z-10 bg-brand-dark">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 75,
                }}
                dpr={pixelRatio}
                performance={{ min: 0.5 }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} />

                    {/* 3D Elements */}
                    <WaveGeometry
                        amplitude={isLowPerformance ? 0.3 : 0.5}
                        frequency={isLowPerformance ? 1.5 : 2}
                        speed={0.5}
                    />

                    {!isLowPerformance && (
                        <ParticleSystem
                            count={isMobile ? 50 : 100}
                            speed={0.3}
                        />
                    )}

                    {/* Logo appears after 3 seconds */}
                    <Logo3D />

                    {/* Camera parallax based on mouse position */}
                    <CameraRig mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Camera rig for parallax effect
function CameraRig({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    useFrame(({ camera }) => {
        camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mousePosition.y * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}
