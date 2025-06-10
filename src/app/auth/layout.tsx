import { Logo } from '@/components/common/logo';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-app-background p-4">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl sm:p-8">
        {children}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Your Social Media, Automated.
      </p>
    </div>
  );
}
