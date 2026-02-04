/**
 * TypeScript Types and Interfaces
 * Following Interface Segregation Principle - specific interfaces for each use case
 */

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Technology {
    name: string;
    category: string;
}

export interface Link {
    label: string;
    href: string;
}

export interface SocialLink {
    platform: string;
    href: string;
    icon: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    href?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
}

export interface WaveGeometryProps {
    color1?: string;
    color2?: string;
    amplitude?: number;
    frequency?: number;
    speed?: number;
}

export interface ParticleSystemProps {
    count?: number;
    color?: string;
    size?: number;
    speed?: number;
}

export interface Logo3DProps {
    delayMs?: number;
    scale?: number;
    glowColor?: string;
}

export interface ContactFormData {
    email: string;
}

export interface MousePosition {
    x: number;
    y: number;
}

export interface ScrollProgress {
    progress: number;
    direction: 'up' | 'down';
}
