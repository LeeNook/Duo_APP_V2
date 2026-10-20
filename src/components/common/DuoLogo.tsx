import React from 'react';

interface DuoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const DuoLogo: React.FC<DuoLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl',
    xl: 'w-24 h-24 rounded-[28px]',
  };

  const svgSizes = {
    sm: 20,
    md: 26,
    lg: 42,
    xl: 60,
  };

  return (
    <div
      className={`inline-flex items-center justify-center bg-brand text-white shadow-md shadow-brand/20 transition-all select-none ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: 'var(--brand)' }}
    >
      <svg
        width={svgSizes[size]}
        height={svgSizes[size]}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized rounded 'D' glyph */}
        <path
          d="M28 20C28 15.5817 31.5817 12 36 12H54C69.464 12 82 24.536 82 40C82 55.464 69.464 68 54 68H36C31.5817 68 28 64.4183 28 60V20Z"
          fill="none"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="82" cy="22" r="7" fill="white" />
      </svg>
    </div>
  );
};
