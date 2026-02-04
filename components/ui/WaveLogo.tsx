/**
 * Wabyte Wave Logo
 * A stylized 'W' wave logo in SVG format
 */
import React from 'react';

export const WaveLogo = ({ className = "w-40 h-40" }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#0055ff" /> {/* Blue */}
                    <stop offset="50%" stopColor="#00aaff" /> {/* Light Blue */}
                    <stop offset="100%" stopColor="#40e0d0" /> {/* Cyan */}
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 
        Stylized W shape made of smooth curves 
        Path mimics a sine-wave like W structure
      */}
            <path
                d="M10,30 C30,30 40,80 60,80 C80,80 90,40 100,40 C110,40 120,80 140,80 C160,80 170,30 190,30"
                stroke="url(#waveGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
            />
        </svg>
    );
};
