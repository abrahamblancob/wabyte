/**
 * Content Constants
 * All text content for the landing page
 */

export const HERO_CONTENT = {
    headline: 'Desarrollamos SaaS que impulsan tu negocio',
    subheadline: 'Convertimos ideas de negocio en plataformas SaaS escalables. Desde la concepción hasta el lanzamiento, construimos el software que tu empresa necesita para crecer.',
    cta: 'Hablemos de tu idea',
} as const;

export const VALUE_PROPOSITIONS = [
    'No solo escribimos código. Construimos productos SaaS desde cero.',
    'Cada plataforma nace de una idea de negocio real, validada y escalable.',
    'Tu visión, nuestra frecuencia de entrega. Resultados que escalan.',
] as const;

export const SERVICES = [
    {
        id: 'custom-software',
        title: 'Desarrollo SaaS a medida',
        description: 'Diseñamos y construimos plataformas SaaS completas adaptadas a tu modelo de negocio. Desde MVPs hasta productos listos para escalar.',
        icon: 'code',
    },
    {
        id: 'cloud-architecture',
        title: 'Arquitectura Cloud & DevOps',
        description: 'Infraestructuras escalables en la nube que crecen con tu producto. Despliegues automatizados, alta disponibilidad y costos optimizados.',
        icon: 'cloud',
    },
    {
        id: 'digital-transformation',
        title: 'Ideación y desarrollo de productos',
        description: 'Transformamos ideas de negocio en productos digitales rentables. Validación, prototipado y desarrollo ágil de principio a fin.',
        icon: 'transform',
    },
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

export const CTA_CONTENT = {
    headline: 'Construyamos tu próximo SaaS',
    subheadline: 'Tienes la idea, nosotros la frecuencia de ejecución. Sin fricción entre concepto y producto.',
    buttonText: 'Iniciar conversación',
    placeholder: 'tu@email.com',
} as const;

export const CLIENTS_CONTENT = {
    headline: 'Nuestros clientes',
    subheadline: 'Empresas que confían en nuestras soluciones SaaS para impulsar su negocio digital.',
} as const;

export const CLIENTS = [
    {
        id: 'rhino-toyo-parts',
        name: 'Rhino Toyo Parts',
        logo: 'https://www.rhinotoyoparts.com/logo.jpg',
        website: 'https://www.rhinotoyoparts.com',
        description: 'Proveedor líder de repuestos Toyota en Venezuela. Soluciones tecnológicas SaaS desarrolladas por wabyte para digitalizar su operación.',
        brandColor: '#1B5E20',
        brandColorLight: '#4CAF50',
        features: [
            {
                name: 'Rhino Vision',
                description: 'Herramienta gratuita con IA que identifica repuestos Toyota al instante. Solo sube una foto del repuesto y en segundos sabrás qué pieza es, su estado y con qué modelos es compatible. Luego contactas directo por WhatsApp.',
                icon: 'vision',
            },
            {
                name: 'Rhino Hub',
                description: 'Plataforma B2B para proveedores de repuestos Toyota en Venezuela. Sube tu inventario en CSV/Excel, llega a miles de compradores, y nosotros gestionamos logística, pagos y auditoría de stock en tiempo real.',
                icon: 'hub',
            },
        ],
    },
] as const;

export const FOOTER_CONTENT = {
    tagline: 'Desarrolladores SaaS. Constructores de ideas de negocio.',
    copyright: `© ${new Date().getFullYear()} wabyte. Todos los derechos reservados.`,
    links: [
        { label: 'Servicios', href: '/#servicios' },
        { label: 'Tecnologías', href: '/#tecnologias' },
        { label: 'Clientes', href: '/clientes' },
        { label: 'Contacto', href: '/#contacto' },
    ],
    social: [
        { platform: 'Instagram', href: 'https://www.instagram.com/wabyte.tech', icon: 'instagram' },
    ],
} as const;
