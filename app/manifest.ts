import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'wabyte',
        short_name: 'wabyte',
        description: 'Convertimos ideas de negocio en plataformas SaaS escalables.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0A0A0A',
        theme_color: '#40E0D0',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            // Add more icon sizes if available (e.g., android-chrome-192x192.png)
        ],
    };
}
