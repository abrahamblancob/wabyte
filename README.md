# Wabyte Landing Page

> Ingeniería Fluida para Negocios Digitales

A modern, visually impactful landing page built with Next.js 15, React Three Fiber, and following SOLID principles and clean architecture.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.170-green)

## ✨ Features

- **3D Animated Waves**: Stunning sinusoidal wave animations with gradient effects (#0055ff → #40e0d0)
- **3D Logo Reveal**: Logo appears after 3 seconds with smooth fade-in and rotation
- **Particle System**: Subtle floating particles synchronized with wave animations
- **Mouse Parallax**: Interactive depth effect following mouse movement
- **Responsive Design**: Optimized for all devices with simplified 3D on mobile
- **Performance Optimized**: Lazy loading, code splitting, and device-based optimization
- **SOLID Architecture**: Clean, maintainable code following best practices
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

## 🎨 Brand Identity

### Color Palette
- **Primary Blue**: `#0055ff`
- **Cyan/Turquoise**: `#40e0d0`
- **Dark Gray**: `#2b2b2b`
- **White**: `#ffffff`

### Typography
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Code**: Fira Code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wabyte
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
wabyte/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── three/               # 3D Components (React Three Fiber)
│   │   ├── Scene.tsx        # Main 3D scene container
│   │   ├── WaveGeometry.tsx # Animated sinusoidal waves
│   │   ├── ParticleSystem.tsx # Floating particles
│   │   ├── Logo3D.tsx       # 3D logo with reveal
│   │   └── WaveShader.ts    # Custom GLSL shaders
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx       # Button with 3D hover effects
│   │   ├── Card.tsx         # Card with tilt effect
│   │   └── ContactForm.tsx  # Email capture form
│   └── sections/            # Landing page sections
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx
│       ├── ValuePropositionSection.tsx
│       ├── TechnologiesSection.tsx
│       ├── CTASection.tsx
│       └── Footer.tsx
├── hooks/                   # Custom React hooks
│   ├── useMouseTracking.ts  # Mouse position tracking
│   ├── useScrollProgress.ts # Scroll position tracking
│   └── use3DOptimization.ts # Device capability detection
├── lib/
│   └── constants/           # Configuration constants
│       ├── brand.ts         # Colors, typography, animations
│       └── content.ts       # All text content
├── types/                   # TypeScript type definitions
│   └── index.ts
└── public/                  # Static assets
```

## 🏗️ Architecture & SOLID Principles

This project follows SOLID principles and clean architecture:

### Single Responsibility Principle (SRP)
- Each component has one clear responsibility
- Business logic separated into custom hooks
- 3D components separated from UI components

### Open/Closed Principle (OCP)
- Components are extensible via props
- Configuration centralized in constants files
- Themes and styles configurable without modifying components

### Liskov Substitution Principle (LSP)
- Consistent interfaces between similar components
- Well-defined TypeScript prop types

### Interface Segregation Principle (ISP)
- Specific, focused interfaces for each component
- No unnecessary props forced on components

### Dependency Inversion Principle (DIP)
- Components depend on abstractions (hooks) not implementations
- Business logic abstracted into custom hooks

## 🎯 Performance Optimization

- **Lazy Loading**: 3D Scene loaded asynchronously
- **Code Splitting**: Automatic route-based splitting
- **Suspense Boundaries**: Progressive loading with fallbacks
- **Device Detection**: Simplified 3D for low-performance devices
- **Memoization**: Heavy components and calculations memoized
- **Pixel Ratio Limiting**: Capped at 2x for performance

### Performance Targets
- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🎨 Key Features Explained

### 3D Sinusoidal Waves
Custom GLSL shaders create animated waves with gradient from blue to cyan. The waves represent "fluid engineering" - the core brand concept.

### Logo Reveal Animation
The 3D logo appears exactly 3 seconds after page load with:
- Fade-in animation
- Scale-up effect
- Continuous Y-axis rotation
- Emissive glow in cyan

### Mouse Parallax
Camera subtly follows mouse movement, creating depth and interactivity.

### Responsive 3D
- **Desktop**: Full 3D effects with high particle count
- **Mobile**: Simplified waves, reduced particles, lower pixel ratio

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and configure:
```bash
# Future API integrations
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FORM_ENDPOINT=
```

### Customization
- **Colors**: Edit `lib/constants/brand.ts`
- **Content**: Edit `lib/constants/content.ts`
- **3D Settings**: Adjust props in `components/three/Scene.tsx`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: WebGL support required for 3D features.

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader compatible
- Color contrast ratios meet WCAG 2.1 AA

## 📄 License

© 2026 wabyte. All rights reserved.

## 🤝 Contributing

This is a proprietary project for wabyte. For questions or collaboration inquiries, please contact the team.

---

**Built with precision. Implemented with artistry.**
