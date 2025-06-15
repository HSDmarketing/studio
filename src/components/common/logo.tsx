
import type { SVGProps } from 'react';

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none" // Ensures rect fills are not overridden
    xmlns="http://www.w3.org/2000/svg"
    {...props} // className for sizing will be passed here
  >
    <rect width="48" height="48" rx="5" fill="hsl(var(--primary))"/> {/* Blue */}
    <rect x="52" width="48" height="48" rx="5" fill="hsl(var(--destructive))"/> {/* Red */}
    <rect y="52" width="48" height="48" rx="5" fill="hsl(var(--chart-3))"/> {/* Yellow */}
    <rect x="52" y="52" width="48" height="48" rx="5" fill="hsl(var(--accent))"/> {/* Green */}
  </svg>
);


export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };
  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }

  return (
    <div className="flex items-center gap-2">
      <LogoIcon className={sizeClasses[size]} />
      <div className={`font-headline font-semibold ${textSizeClasses[size]}`}>
        <span className="text-primary">R</span>
        <span className="text-destructive">e</span>
        <span className="text-chart-3">p</span>
        <span className="text-accent">l</span>
        <span className="text-primary">y</span>
        <span className="text-destructive">D</span>
        <span className="text-chart-3">o</span>
      </div>
    </div>
  );
}
