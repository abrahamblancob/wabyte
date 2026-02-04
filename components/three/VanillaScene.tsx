/**
 * Vanilla Three.js Scene Component
 * Direct Three.js implementation without React Three Fiber
 * Avoids compatibility issues with Next.js 15
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function VanillaScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a); // Dark background matching the reference

        // Use clear background color to blend with CSS if needed, or keep dark
        // scene.background = null; 

        // Orthographic camera for true 2D effect
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Full screen quad for the 2D shader
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Shader for the glowing wave
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uColor: { value: new THREE.Color(0x00ffff) }, // Cyan
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv * 2.0 - 1.0; // Center origin
          uv.x *= uResolution.x / uResolution.y; // Aspect ratio adjustment

          // Wave parameters
          float frequency = 2.0;
          float amplitude = 0.5;
          float speed = 1.0;
          
          // Calculate wave position
          float waveY = sin(uv.x * frequency + uTime * speed) * amplitude;
          
          // Distance from the wave (for the line thickness)
          float dist = abs(uv.y - waveY);
          
          // Create the glow effect (3D volumentric look in 2D)
          // Sharp core
          float intensity = 0.002 / (dist + 0.002);
          
          // Add a second layer for the "halo" glow
          intensity += 0.01 / (dist + 0.1); // Softer outer glow
          
          // Pulse the intensity slightly
          intensity *= 1.0 + 0.2 * sin(uTime * 2.0);

          // Colorize
          vec3 finalColor = uColor * intensity;
          
          // Tone mapping hack to prevent blowout and keep colors nice
          finalColor = pow(finalColor, vec3(1.0/2.2)); // Gamma correction approximation
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
            transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Particles/Stars background for depth (optional, keeping it simple first as requested)
        // Adding separate particle system for the "3D destello" feeling if needed, 
        // but the shader glow should handle the main request. 
        // Let's add subtle particles to keep the scene alive like the previous one.

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 50;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 4; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // z
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x00ffff,
            size: 0.02,
            transparent: true,
            opacity: 0.5
        });

        // We need a perspective camera for the particles to look 3D, or we can just move them in 2D.
        // Since we switched to Ortho camera for the background shader, let's skip 3D particles 
        // or render them in a separate scene. 
        // To keep it simple and purely 2D as requested "hacerlo en 2D":
        // I will omit the particles for now to focus on the perfect wave look.

        // Animation loop
        const animate = () => {
            material.uniforms.uTime.value += 0.01; // Slower speed as requested before
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height);
            material.uniforms.uResolution.value.set(width, height);

            // Update camera if needed (ortho doesn't change FOV but aspect)
            // For shader, we handle aspect in GLSL.
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
