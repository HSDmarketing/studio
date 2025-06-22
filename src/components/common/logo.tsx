import type { SVGProps } from 'react';

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
    width="100"
    height="100"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Blue Chat Bubble */}
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      fill="hsl(var(--primary))"
    />
    {/* Green Checkmark */}
    <path
      d="M9 11.5L11 13.5L15 9.5"
      stroke="hsl(var(--accent))"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
