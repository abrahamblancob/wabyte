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
        scene.background = new THREE.Color(0x2b2b2b); // Dark background
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(10, 10, 5);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-10, -10, -5);
        scene.add(directionalLight2);

        // Create hyper-realistic wave geometry with higher detail
        const geometry = new THREE.PlaneGeometry(15, 15, 128, 128);

        // Advanced shader material for hyper-realistic waves
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColorDeep: { value: new THREE.Color(0x001a4d) },    // Deep blue
                uColorShallow: { value: new THREE.Color(0x0055ff) }, // Medium blue
                uColorFoam: { value: new THREE.Color(0x40e0d0) },    // Cyan foam
                uLightPosition: { value: new THREE.Vector3(10, 10, 5) },
            },
            vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        // Improved noise function for more organic waves
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Multiple wave layers for realism
          float wave1 = snoise(vec2(pos.x * 0.5 + uTime * 0.3, pos.y * 0.5 + uTime * 0.2)) * 0.8;
          float wave2 = snoise(vec2(pos.x * 1.2 - uTime * 0.4, pos.y * 1.2)) * 0.4;
          float wave3 = snoise(vec2(pos.x * 2.0 + uTime * 0.6, pos.y * 2.0 - uTime * 0.3)) * 0.2;
          float wave4 = snoise(vec2(pos.x * 4.0 - uTime * 0.8, pos.y * 4.0 + uTime * 0.5)) * 0.1;
          
          float elevation = wave1 + wave2 + wave3 + wave4;
          pos.z = elevation;
          
          vElevation = elevation;
          vPosition = pos;
          
          // Calculate normals for lighting
          float offset = 0.1;
          vec3 posX = vec3(pos.x + offset, pos.y, 
            snoise(vec2((pos.x + offset) * 0.5 + uTime * 0.3, pos.y * 0.5 + uTime * 0.2)) * 0.8 +
            snoise(vec2((pos.x + offset) * 1.2 - uTime * 0.4, pos.y * 1.2)) * 0.4 +
            snoise(vec2((pos.x + offset) * 2.0 + uTime * 0.6, pos.y * 2.0 - uTime * 0.3)) * 0.2 +
            snoise(vec2((pos.x + offset) * 4.0 - uTime * 0.8, pos.y * 4.0 + uTime * 0.5)) * 0.1
          );
          vec3 posY = vec3(pos.x, pos.y + offset,
            snoise(vec2(pos.x * 0.5 + uTime * 0.3, (pos.y + offset) * 0.5 + uTime * 0.2)) * 0.8 +
            snoise(vec2(pos.x * 1.2 - uTime * 0.4, (pos.y + offset) * 1.2)) * 0.4 +
            snoise(vec2(pos.x * 2.0 + uTime * 0.6, (pos.y + offset) * 2.0 - uTime * 0.3)) * 0.2 +
            snoise(vec2(pos.x * 4.0 - uTime * 0.8, (pos.y + offset) * 4.0 + uTime * 0.5)) * 0.1
          );
          
          vec3 tangentX = normalize(posX - pos);
          vec3 tangentY = normalize(posY - pos);
          vNormal = normalize(cross(tangentX, tangentY));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 uColorDeep;
        uniform vec3 uColorShallow;
        uniform vec3 uColorFoam;
        uniform vec3 uLightPosition;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Depth-based color
          float depthMix = smoothstep(-1.5, 1.0, vElevation);
          vec3 waterColor = mix(uColorDeep, uColorShallow, depthMix);
          
          // Add foam to peaks
          float foam = smoothstep(0.6, 1.2, vElevation);
          waterColor = mix(waterColor, uColorFoam, foam * 0.7);
          
          // Lighting calculations
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(uLightPosition - vPosition);
          
          // Diffuse lighting
          float diffuse = max(dot(normal, lightDir), 0.0);
          
          // Specular highlights (Phong)
          vec3 viewDir = normalize(cameraPosition - vPosition);
          vec3 reflectDir = reflect(-lightDir, normal);
          float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
          
          // Fresnel effect for realistic water
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
          
          // Combine lighting
          vec3 ambient = waterColor * 0.3;
          vec3 diffuseColor = waterColor * diffuse * 0.7;
          vec3 specularColor = vec3(1.0) * specular * 0.5;
          vec3 fresnelColor = uColorFoam * fresnel * 0.3;
          
          vec3 finalColor = ambient + diffuseColor + specularColor + fresnelColor;
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const waveMesh = new THREE.Mesh(geometry, material);
        waveMesh.rotation.x = -Math.PI * 0.3;
        waveMesh.position.y = -1;
        scene.add(waveMesh);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 100;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x40e0d0,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Mouse tracking
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Update wave shader
            material.uniforms.uTime.value = elapsedTime * 0.5;

            // Rotate wave
            waveMesh.rotation.z = elapsedTime * 0.05;

            // Animate particles
            particles.rotation.y = elapsedTime * 0.05;
            const particlesPositions = particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                particlesPositions[i3 + 1] += Math.sin(elapsedTime + i) * 0.001;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Camera parallax
            camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
