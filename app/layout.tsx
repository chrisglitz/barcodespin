import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BARCODE SPIN',
  description: 'Cybersecurity question picker wheel - spin to get your next conversation starter',
  icons: {
    icon: '/brand/barcode-spin-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
