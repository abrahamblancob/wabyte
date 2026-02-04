/**
 * Wave Geometry Component
 * Following Single Responsibility Principle - handles only wave rendering
 * Following Open/Closed Principle - configurable via props
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { waveVertexShader, waveFragmentShader } from './WaveShader';
import type { WaveGeometryProps } from '@/types';
import { COLORS } from '@/lib/constants/brand';

export function WaveGeometry({
    color1 = COLORS.blue,
    color2 = COLORS.cyan,
    amplitude = 0.5,
    frequency = 2,
    speed = 0.5,
}: WaveGeometryProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Memoize shader uniforms for performance
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uAmplitude: { value: amplitude },
            uFrequency: { value: frequency },
            uColor1: { value: new THREE.Color(color1) },
            uColor2: { value: new THREE.Color(color2) },
        }),
        [amplitude, frequency, color1, color2]
    );

    // Animate the wave
    useFrame((state) => {
        if (meshRef.current) {
            uniforms.uTime.value = state.clock.elapsedTime * speed;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2, -5]}>
            <planeGeometry args={[20, 20, 128, 128]} />
            <shaderMaterial
                vertexShader={waveVertexShader}
                fragmentShader={waveFragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
