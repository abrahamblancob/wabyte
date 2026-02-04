/**
 * Particle System Component
 * Following Single Responsibility Principle - handles only particle rendering
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ParticleSystemProps } from '@/types';
import { COLORS } from '@/lib/constants/brand';

export function ParticleSystem({
    count = 100,
    color = COLORS.cyan,
    size = 0.05,
    speed = 0.3,
}: ParticleSystemProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate particle positions
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        return pos;
    }, [count]);

    // Animate particles
    useFrame((state) => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Floating animation
                positions[i3 + 1] += Math.sin(state.clock.elapsedTime * speed + i) * 0.001;

                // Reset particles that float too high
                if (positions[i3 + 1] > 10) {
                    positions[i3 + 1] = -10;
                }
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
