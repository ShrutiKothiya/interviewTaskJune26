import type { ReactNode } from 'react';
import { clsx } from 'clsx';

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={clsx('bg-white rounded-xl shadow-md overflow-hidden', className)}>
      {children}
    </div>
  );
}
