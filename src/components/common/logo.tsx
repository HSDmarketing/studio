import type { SVGProps } from 'react';

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 25C20 22.2386 22.2386 20 25 20H75C77.7614 20 80 22.2386 80 25V35C80 37.7614 77.7614 40 75 40H25C22.2386 40 20 37.7614 20 35V25Z" />
    <path d="M20 50C20 47.2386 22.2386 45 25 45H60C62.7614 45 65 47.2386 65 50V60C65 62.7614 62.7614 65 60 65H25C22.2386 65 20 62.7614 20 60V50Z" />
    <path d="M20 75C20 72.2386 22.2386 70 25 70H40C42.7614 70 45 72.2386 45 75V80C45 82.7614 42.7614 85 40 85H25C22.2386 85 20 82.7614 20 80V75Z" />
    <rect x="55" y="70" width="25" height="15" rx="5" />
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
    <div className="flex items-center gap-2 text-primary">
      <LogoIcon className={sizeClasses[size]} />
      <span className={`font-headline font-semibold ${textSizeClasses[size]}`}>RepliGo</span>
    </div>
  );
}
