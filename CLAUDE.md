# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wabyte is a Spanish-language landing page for a software consultancy, built with Next.js 15 (App Router), React 19, TypeScript, and Three.js. The site features 3D animated wave backgrounds and follows SOLID principles throughout.

## Commands

```bash
npm run dev          # Dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm start            # Production server
npm run lint         # ESLint
```

No test framework is currently configured.

## Architecture

**Entry point:** `app/page.tsx` is a Client Component (`'use client'`) that composes all sections. 3D components are loaded via `next/dynamic` with `ssr: false` to avoid hydration issues.

**Layer structure:**
- `components/three/` — Three.js/R3F 3D scenes. `VanillaScene.tsx` is the active wave background (vanilla Three.js with custom GLSL shaders in `WaveShader.ts`). `Scene.tsx` (R3F-based) is currently commented out.
- `components/sections/` — Page sections (Hero, Services, ValueProposition, Technologies, CTA, Footer)
- `components/ui/` — Reusable UI (Button, Card, ContactForm, Navbar, WaveLogo)
- `hooks/` — Business logic: `useMouseTracking` (parallax), `useScrollProgress` (scroll detection), `use3DOptimization` (device capability/performance detection)
- `lib/constants/` — `brand.ts` (colors, typography, animation config) and `content.ts` (all Spanish copy). No hardcoded values in components; all configuration lives here.
- `types/index.ts` — All TypeScript interfaces (component props, data models, hook returns)

## Key Conventions

- **All site content is in Spanish.** Keep content in Spanish when modifying `lib/constants/content.ts`.
- **Import order:** external deps → internal components → hooks → constants/types
- **Path alias:** `@/*` maps to the project root
- **3D components must be dynamically imported** with `ssr: false` to prevent Next.js SSR/hydration errors
- **Brand colors:** primary blue `#0055ff`, cyan `#40e0d0`, dark `#2b2b2b`, white `#ffffff` — defined in `lib/constants/brand.ts` and mirrored in `tailwind.config.ts`
- **Fonts:** Inter (headings/body) and Fira Code (monospace), loaded via `next/font/google` in `app/layout.tsx`
- **Animation stack:** Framer Motion for UI animations, vanilla Three.js + GLSL shaders for 3D wave effects, GSAP available but secondary
- **3D font dependency:** `Logo3D.tsx` requires `/fonts/inter_bold.json` in public/ (see FONTS.md for generation instructions). The logo won't render without it.
- **Performance:** 3D is simplified on mobile via `use3DOptimization` hook (reduced particles, lower pixel ratio capped at 2x)
