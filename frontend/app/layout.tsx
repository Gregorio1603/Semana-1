import type { Metadata } from 'next';
import Providers from '../store/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Habit Tracker',
  description: 'Semana 2 — Next.js + Redux Toolkit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}