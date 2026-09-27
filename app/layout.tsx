import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'FoodConnect Bharat — Connect Food. Connect People. Reduce Waste.',
    description: 'A map-first food redistribution platform for Indian communities connecting surplus food with people in need.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
                {children}
            </body>
        </html>
    );
}
