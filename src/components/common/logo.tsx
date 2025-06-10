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
    <rect width="48" height="48" rx="5" fill="#4285F4"/> {/* Blue */}
    <rect x="52" width="48" height="48" rx="5" fill="#DB4437"/> {/* Red */}
    <rect y="52" width="48" height="48" rx="5" fill="#F4B400"/> {/* Yellow */}
    <rect x="52" y="52" width="48" height="48" rx="5" fill="#0F9D58"/> {/* Green */}
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
    <div className="flex items-center gap-2"> {/* text-primary removed to let logo colors show */}
      <LogoIcon className={sizeClasses[size]} />
      <span className={`font-headline font-semibold ${textSizeClasses[size]} text-primary`}>RepliGo</span> {/* Text color remains primary */}
    </div>
  );
}
