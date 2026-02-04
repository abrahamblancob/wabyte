# Architecture Documentation

## Overview

The Wabyte landing page is built following **SOLID principles** and **clean architecture** patterns. This document explains the architectural decisions and how SOLID principles are applied throughout the codebase.

## Architecture Layers

### 1. Presentation Layer (`components/`)
Responsible for rendering UI and handling user interactions.

#### 3D Components (`components/three/`)
- **Scene.tsx**: Main 3D canvas container
- **WaveGeometry.tsx**: Animated sinusoidal waves
- **ParticleSystem.tsx**: Floating particle effects
- **Logo3D.tsx**: 3D logo with reveal animation
- **WaveShader.ts**: Custom GLSL shaders

#### UI Components (`components/ui/`)
- **Button.tsx**: Reusable button with variants
- **Card.tsx**: Container with hover effects
- **ContactForm.tsx**: Email capture form

#### Section Components (`components/sections/`)
- **HeroSection.tsx**: Landing hero
- **ServicesSection.tsx**: Services grid
- **ValuePropositionSection.tsx**: Value props and metrics
- **TechnologiesSection.tsx**: Tech stack display
- **CTASection.tsx**: Contact section
- **Footer.tsx**: Site footer

### 2. Business Logic Layer (`hooks/`)
Custom hooks encapsulate business logic and state management.

- **useMouseTracking.ts**: Mouse position tracking for parallax
- **useScrollProgress.ts**: Scroll position and direction
- **use3DOptimization.ts**: Device capability detection

### 3. Data Layer (`lib/constants/`)
Centralized configuration and content.

- **brand.ts**: Colors, typography, animations
- **content.ts**: All text content and copy

### 4. Type Definitions (`types/`)
TypeScript interfaces and types for type safety.

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)

Each component and module has exactly one reason to change.

**Examples:**
- `WaveGeometry.tsx` only handles wave rendering
- `useMouseTracking.ts` only tracks mouse position
- `Button.tsx` only renders button UI

**Benefits:**
- Easy to test individual components
- Changes are isolated and predictable
- Code is more maintainable

### Open/Closed Principle (OCP)

Components are open for extension but closed for modification.

**Examples:**
```typescript
// Button component accepts variant prop for extension
<Button variant="primary" size="lg">Click Me</Button>
<Button variant="outline" size="sm">Cancel</Button>

// WaveGeometry accepts configuration props
<WaveGeometry amplitude={0.5} frequency={2} speed={0.5} />
```

**Implementation:**
- Props-based configuration
- Centralized constants in `lib/constants/`
- No hardcoded values in components

**Benefits:**
- New variants can be added without modifying existing code
- Configuration changes don't require component updates
- Easy to maintain and extend

### Liskov Substitution Principle (LSP)

Components with similar interfaces can be substituted without breaking functionality.

**Examples:**
```typescript
// All button variants have consistent interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  href?: string;
}
```

**Benefits:**
- Predictable component behavior
- Easy to swap implementations
- Consistent API across similar components

### Interface Segregation Principle (ISP)

Components receive only the props they need.

**Examples:**
```typescript
// WaveGeometry only needs wave-specific props
interface WaveGeometryProps {
  color1?: string;
  color2?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

// ParticleSystem only needs particle-specific props
interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}
```

**Benefits:**
- No unnecessary dependencies
- Clear component contracts
- Easier to understand and use

### Dependency Inversion Principle (DIP)

High-level components depend on abstractions (hooks), not concrete implementations.

**Examples:**
```typescript
// Scene.tsx depends on useMouseTracking hook (abstraction)
// not on direct mouse event handling (implementation)
const mousePosition = useMouseTracking();

// Components use the hook's interface, not implementation details
<CameraRig mousePosition={mousePosition} />
```

**Benefits:**
- Business logic is reusable
- Components are easier to test
- Implementation can change without affecting consumers

## Component Relationships

```
┌─────────────────────────────────────────┐
│           app/page.tsx                  │
│         (Main Orchestrator)             │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌──────▼──────────┐
│  3D Components │  │  Section Comps  │
│   (Lazy Load)  │  │  (Eager Load)   │
└───────┬────────┘  └──────┬──────────┘
        │                   │
        │           ┌───────▼────────┐
        │           │  UI Components │
        │           └───────┬────────┘
        │                   │
        └───────┬───────────┘
                │
        ┌───────▼────────┐
        │  Custom Hooks  │
        │  (Bus. Logic)  │
        └───────┬────────┘
                │
        ┌───────▼────────┐
        │   Constants    │
        │  (Data Layer)  │
        └────────────────┘
```

## Data Flow

1. **User Interaction** → Component
2. **Component** → Custom Hook (if business logic needed)
3. **Custom Hook** → State Update
4. **State Update** → Component Re-render
5. **Component** → UI Update

## Performance Optimizations

### Code Splitting
- 3D Scene is lazy-loaded
- Automatic route-based splitting by Next.js

### Memoization
```typescript
// Shader uniforms are memoized
const uniforms = useMemo(() => ({
  uTime: { value: 0 },
  uColor1: { value: new THREE.Color(color1) },
}), [color1]);
```

### Suspense Boundaries
```typescript
<Suspense fallback={<SceneLoader />}>
  <Scene />
</Suspense>
```

### Device-Based Optimization
```typescript
const { isMobile, isLowPerformance } = use3DOptimization();

<WaveGeometry
  amplitude={isLowPerformance ? 0.3 : 0.5}
/>
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMouseTracking.ts`)
- **Constants**: camelCase (e.g., `brand.ts`)
- **Types**: PascalCase (e.g., `ButtonProps`)

## Import Organization

```typescript
// 1. External dependencies
import { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Internal components
import { Button } from '@/components/ui/Button';

// 3. Hooks
import { useMouseTracking } from '@/hooks/useMouseTracking';

// 4. Constants and types
import { COLORS } from '@/lib/constants/brand';
import type { ButtonProps } from '@/types';
```

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Mock custom hooks
- Test business logic in hooks

### Integration Tests
- Test component interactions
- Test form submissions
- Test navigation flows

### E2E Tests
- Test complete user journeys
- Test 3D rendering (if possible)
- Test responsive behavior

## Future Enhancements

### Potential Additions
1. **Animation Library**: Centralized animation utilities
2. **Theme System**: Dark/light mode support
3. **i18n**: Multi-language support
4. **CMS Integration**: Dynamic content management
5. **Analytics**: User behavior tracking
6. **A/B Testing**: Variant testing framework

### Scalability Considerations
- Component library extraction
- Shared design system
- Micro-frontend architecture
- Server-side rendering optimization

## Conclusion

This architecture provides:
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new features
- **Testability**: Components are isolated and mockable
- **Performance**: Optimized loading and rendering
- **Type Safety**: Full TypeScript coverage

The SOLID principles ensure the codebase remains clean, organized, and easy to work with as the project grows.
