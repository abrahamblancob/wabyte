/**
 * Content Constants
 * All text content for the landing page
 */

export const HERO_CONTENT = {
    headline: 'Ingeniería Fluida para Negocios Digitales',
    subheadline: 'Diseñamos arquitecturas de software que resuenan con tus objetivos. Precisión matemática, implementación artística.',
    cta: 'Sincroniza tu Visión',
} as const;

export const VALUE_PROPOSITIONS = [
    'No escribimos código. Orquestamos frecuencias digitales.',
    'Cada solución es una onda optimizada para tu mercado.',
    'Estructuras que fluyen. Resultados que escalan.',
] as const;

export const SERVICES = [
    {
        id: 'custom-software',
        title: 'Desarrollo de Software a Medida',
        description: 'Arquitecturas diseñadas específicamente para resonar con tus procesos de negocio. Cada línea de código optimizada para tu frecuencia.',
        icon: 'code',
    },
    {
        id: 'cloud-architecture',
        title: 'Arquitectura de Soluciones Cloud',
        description: 'Infraestructuras escalables que fluyen con tu crecimiento. Diseño cloud-native con precisión matemática.',
        icon: 'cloud',
    },
    {
        id: 'digital-transformation',
        title: 'Transformación Digital',
        description: 'Sincronizamos tu visión con la tecnología actual. Evolución continua, implementación artística.',
        icon: 'transform',
    },
] as const;

export const TECHNOLOGIES = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
] as const;

export const METRICS = {
    experience: '10+',
    projects: '50+',
    technologies: '20+',
} as const;

export const CTA_CONTENT = {
    headline: 'Diseña tu Frecuencia',
    subheadline: 'Comienza a sincronizar tu visión con la tecnología. Sin fricción entre idea y ejecución.',
    buttonText: 'Iniciar Conversación',
    placeholder: 'tu@email.com',
} as const;

export const FOOTER_CONTENT = {
    tagline: 'Arquitectos digitales, no solo ejecutores.',
    copyright: `© ${new Date().getFullYear()} wabyte. Todos los derechos reservados.`,
    links: [
        { label: 'Servicios', href: '#servicios' },
        { label: 'Tecnologías', href: '#tecnologias' },
        { label: 'Contacto', href: '#contacto' },
    ],
    social: [
        { platform: 'GitHub', href: '#', icon: 'github' },
        { platform: 'LinkedIn', href: '#', icon: 'linkedin' },
        { platform: 'Twitter', href: '#', icon: 'twitter' },
    ],
} as const;
