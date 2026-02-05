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
    title: "wabyte | Ingeniería Fluida para Negocios Digitales",
    description: "Diseñamos arquitecturas de software que resuenan con tus objetivos. Precisión matemática, implementación artística.",
    keywords: ["desarrollo de software", "arquitectura cloud", "transformación digital", "wabyte"],
    authors: [{ name: "wabyte" }],
    openGraph: {
        title: "wabyte | Ingeniería Fluida para Negocios Digitales",
        description: "Diseñamos arquitecturas de software que resuenan con tus objetivos.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} ${firaCode.variable}`}>
            <head>
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
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
