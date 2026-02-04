/**
 * 3D Logo Component
 * Following Single Responsibility Principle - handles only logo 3D rendering
 * Appears after 3 seconds with reveal animation
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Center } from '@react-three/drei';
import * as THREE from 'three';
import type { Logo3DProps } from '@/types';
import { COLORS, ANIMATION } from '@/lib/constants/brand';

export function Logo3D({
    delayMs = ANIMATION.durations.logoReveal,
    scale = 1,
    glowColor = COLORS.cyan,
}: Logo3DProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [visible, setVisible] = useState(false);
    const [opacity, setOpacity] = useState(0);

    // Reveal after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delayMs);

        return () => clearTimeout(timer);
    }, [delayMs]);

    // Animate reveal and rotation
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Smooth rotation
            groupRef.current.rotation.y += delta * 0.2;

            // Fade in animation
            if (visible && opacity < 1) {
                setOpacity((prev) => Math.min(prev + delta * 0.5, 1));
            }

            // Scale animation
            if (visible) {
                const targetScale = scale;
                const currentScale = groupRef.current.scale.x;
                if (currentScale < targetScale) {
                    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 2);
                    groupRef.current.scale.set(newScale, newScale, newScale);
                }
            }
        }
    });

    if (!visible && opacity === 0) return null;

    return (
        <group ref={groupRef} scale={0.1}>
            <Center>
                <Text
                    fontSize={0.5}
                    color={COLORS.white}
                    anchorX="center"
                    anchorY="middle"
                >
                    wabyte
                    <meshStandardMaterial
                        color={COLORS.white}
                        emissive={glowColor}
                        emissiveIntensity={0.5 * opacity}
                        transparent
                        opacity={opacity}
                    />
                </Text>
            </Center>
        </group>
    );
}
