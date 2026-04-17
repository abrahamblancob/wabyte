/**
 * Content Constants
 * Structural data that doesn't change by language.
 * All translatable text lives in lib/i18n/translations/
 */

export const SERVICES_META = [
    { id: 'custom-software', icon: 'code' },
    { id: 'cloud-architecture', icon: 'cloud' },
    { id: 'digital-transformation', icon: 'transform' },
] as const;

export const TECHNOLOGIES = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Google Cloud', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'AI Models', category: 'Artificial Intelligence' },
] as const;

export const METRICS = {
    experience: '10+',
    projects: '50+',
    technologies: '20+',
} as const;

export const CLIENTS = [
    {
        id: 'rhino-toyo-parts',
        name: 'Rhino Toyo Parts',
        logo: 'https://www.rhinotoyoparts.com/logo.jpg',
        website: 'https://www.rhinotoyoparts.com',
        brandColor: '#1B5E20',
        brandColorLight: '#4CAF50',
        features: [
            { name: 'Rhino Vision', icon: 'vision' },
            { name: 'Rhino Hub', icon: 'hub' },
        ],
    },
    {
        id: 'picking-brothers',
        name: 'Picking Brothers',
        logo: 'https://www.pickingbrothers.com/logo.png',
        website: 'https://www.pickingbrothers.com',
        brandColor: '#0D1B4A',
        brandColorLight: '#FF8C00',
        features: [
            { name: 'Picking WMS', icon: 'hub' },
            { name: 'Picking Tracker', icon: 'vision' },
        ],
    },
    {
        id: 'dddare',
        name: 'DDDare',
        logo: 'https://www.dddare.net/brand/icon-1024.png',
        website: 'https://www.dddare.net',
        brandColor: '#0d2b6b',
        brandColorLight: '#10a0c7',
        features: [
            { name: 'DDDare Web', icon: 'web' },
            { name: 'DDDare App', icon: 'mobile' },
        ],
    },
] as const;

export const FOOTER_SOCIAL = [
    { platform: 'Instagram', href: 'https://www.instagram.com/wabyte.tech', icon: 'instagram' },
] as const;

export const FOOTER_LINKS = [
    { key: 'servicios', href: '/#servicios' },
    { key: 'tecnologias', href: '/#tecnologias' },
    { key: 'clientes', href: '/clientes' },
    { key: 'contacto', href: '/#contacto' },
] as const;
