import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-fira-code",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.wabyte.net"),
    title: {
        default: "wabyte | Desarrollamos SaaS que impulsan tu negocio",
        template: "%s | wabyte",
    },
    description: "Convertimos ideas de negocio en plataformas SaaS escalables. Desarrollo de software a medida, arquitectura cloud y productos digitales.",
    keywords: ["desarrollo saas", "software a medida", "arquitectura cloud", "productos digitales", "wabyte", "desarrollo web chile"],
    authors: [{ name: "wabyte" }],
    creator: "wabyte",
    publisher: "wabyte",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "wabyte | Desarrollamos SaaS que impulsan tu negocio",
        description: "Convertimos ideas de negocio en plataformas SaaS escalables.",
        url: "https://www.wabyte.net",
        siteName: "wabyte",
        locale: "es_CL",
        type: "website",
        images: [
            {
                url: "/logo-transparent.png", // Use a specific OG image if available later
                width: 1200,
                height: 630,
                alt: "wabyte - Desarrollo SaaS",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "wabyte | Desarrollamos SaaS que impulsan tu negocio",
        description: "Convertimos ideas de negocio en plataformas SaaS escalables.",
        images: ["/logo-transparent.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "wabyte",
    "url": "https://www.wabyte.net",
    "logo": "https://www.wabyte.net/logo-transparent.png",
    "description": "Convertimos ideas de negocio en plataformas SaaS escalables. Desarrollo de software a medida, arquitectura cloud y productos digitales.",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "CL"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "contacto@wabyte.net"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} ${firaCode.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-52DZ4DGV');
                    `}
                </Script>
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-GGSCGL18TR"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-GGSCGL18TR');
                    `}
                </Script>
                {/* Microsoft Clarity */}
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "vcgs304bzy");
                    `}
                </Script>
            </head>
            <body className={inter.className}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-52DZ4DGV"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {children}
            </body>
        </html>
    );
}
