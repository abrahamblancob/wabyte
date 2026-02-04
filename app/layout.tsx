import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
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
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
