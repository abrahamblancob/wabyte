/**
 * Tech Stack 3D Scene
 * Interactive isometric view of technology blocks
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TECHNOLOGIES } from '@/lib/constants/content';

interface TechStackSceneProps {
    onHover: (tech: string | null) => void;
}

export function TechStackScene({ onHover }: TechStackSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-1000, -1000));
    const blocksRef = useRef<THREE.Mesh[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Orthographic camera
        const width = container.clientWidth;
        const height = container.clientHeight;
        const aspect = width / height;
        const frustumSize = 14; // Zoomed IN (smaller frustum = larger objects)

        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            1000
        );

        // Isometric angle
        camera.position.set(20, 20, 20);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Transparent background
        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting - High intensity for visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        // Neon lights
        const blueLight = new THREE.PointLight(0x0055ff, 4, 50);
        blueLight.position.set(-10, 10, 10);
        scene.add(blueLight);

        const cyanLight = new THREE.PointLight(0x40e0d0, 4, 50);
        cyanLight.position.set(10, 10, -10);
        scene.add(cyanLight);

        // Create blocks
        const gridSize = 4;
        const spacing = 2.4;
        blocksRef.current = [];

        // Texture generation
        const createTexture = (text: string, category: string) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Background
                ctx.fillStyle = '#111111';
                ctx.fillRect(0, 0, 512, 512);

                // Border
                ctx.strokeStyle = '#40e0d0';
                ctx.lineWidth = 25;
                ctx.strokeRect(12, 12, 488, 488);

                // Inner glow hint
                const gradient = ctx.createRadialGradient(256, 256, 100, 256, 256, 256);
                gradient.addColorStop(0, 'rgba(0, 85, 255, 0.25)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 512, 512);

                // Text - Adjusted for better visibility
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 75px monospace'; // Large font
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, 256, 250);

                // Category small text
                ctx.fillStyle = '#40e0d0';
                ctx.font = '35px monospace';
                ctx.fillText(category.toUpperCase(), 256, 330);
            }
            return new THREE.CanvasTexture(canvas);
        };

        TECHNOLOGIES.forEach((tech, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);

            const x = (col - 1.5) * spacing;
            const z = (row - 0.5) * spacing;

            const texture = createTexture(tech.name, tech.category);

            const geometry = new THREE.BoxGeometry(2, 0.6, 2);

            // Material with Emissive
            const topMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.2,
                metalness: 0.8,
                emissive: 0x001133,
                emissiveIntensity: 0.6
            });

            const sideMaterial = new THREE.MeshStandardMaterial({
                color: 0x222222,
                roughness: 0.5,
                metalness: 0.5
            });

            const materials = [
                sideMaterial, // right
                sideMaterial, // left
                topMaterial,  // top
                sideMaterial, // bottom
                sideMaterial, // front
                sideMaterial, // back
            ];

            const cube = new THREE.Mesh(geometry, materials);
            cube.position.set(x, 0, z);
            cube.userData = {
                originalY: 0,
                techName: tech.name,
                techCategory: tech.category
            };

            scene.add(cube);
            blocksRef.current.push(cube);

            // Wireframe highlight
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0055ff, transparent: true, opacity: 0.4 }));
            cube.add(line);

            // Glow plane
            const glowGeometry = new THREE.PlaneGeometry(2.4, 2.4);
            const glowMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.rotation.x = -Math.PI / 2;
            glow.position.set(x, -0.4, z);
            scene.add(glow);
        });

        // Interaction handlers
        const onMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const onMouseLeave = () => {
            mouseRef.current.set(-1000, -1000);
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);

        // Animation Loop
        let hoveredTech: string | null = null;
        let animationId = 0;

        const animate = () => {
            if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

            raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
            const intersects = raycasterRef.current.intersectObjects(blocksRef.current);

            let currentHover: string | null = null;

            blocksRef.current.forEach((block) => {
                const targetY = block.userData.originalY;
                block.position.y += (targetY - block.position.y) * 0.1;
            });

            if (intersects.length > 0) {
                const intersectedBlock = intersects[0].object as THREE.Mesh;
                const targetY = intersectedBlock.userData.originalY + 1.0;
                intersectedBlock.position.y += (targetY - intersectedBlock.position.y) * 0.15;
                currentHover = intersectedBlock.userData.techName;
            }

            if (currentHover !== hoveredTech) {
                hoveredTech = currentHover;
                onHover(hoveredTech);
                container.style.cursor = currentHover ? 'pointer' : 'default';
            }

            rendererRef.current.render(sceneRef.current, cameraRef.current);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            const asp = w / h;

            cameraRef.current!.left = -frustumSize * asp / 2;
            cameraRef.current!.right = frustumSize * asp / 2;
            cameraRef.current!.top = frustumSize / 2;
            cameraRef.current!.bottom = -frustumSize / 2;
            cameraRef.current!.updateProjectionMatrix();

            rendererRef.current!.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseLeave);

            if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
                container.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }

            blocksRef.current.forEach(mesh => {
                mesh.geometry.dispose();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach(m => m.dispose());
                } else {
                    (mesh.material as THREE.Material).dispose();
                }
            });
        };
    }, [onHover]);

    return <div ref={containerRef} className="w-full h-full" />;
}
