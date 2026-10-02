'use client';

import { ToastProvider } from '@heroui/react';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastProvider placement="bottom end" />
    </>
  );
}
