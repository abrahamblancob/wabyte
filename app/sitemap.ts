import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.wabyte.net';
    const lastModified = new Date();

    return [
        {
            url: `${baseUrl}/`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/clientes`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}
