/* eslint-disable react/no-children-prop */
import ProviderShell from '@/components/ProviderShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Frontend',
  description: 'Test frontend developer',
  authors: {
    name: 'Salman Dwi Maulana Akbar',
    url: 'https://github.com/SalmanDMA',
  },
  icons: {
    icon: '/images/logo.svg',
  },
  openGraph: {
    title: 'Home',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProviderShell children={children} />;
}
