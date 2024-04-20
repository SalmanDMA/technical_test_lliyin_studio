'use client';
/* eslint-disable react/no-children-prop */
import { SessionProvider } from 'next-auth/react';
import AppShell from './AppShell';

const ProviderShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AppShell children={children} />
    </SessionProvider>
  );
};

export default ProviderShell;
