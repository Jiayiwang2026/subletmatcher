// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata = {
    title: 'SubletMatcher - Smart Sublease Matching Platform',
    description: 'Find your perfect sublease with our AI-powered matching platform. Studio, 1B1B, 2B2B, and more available.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
