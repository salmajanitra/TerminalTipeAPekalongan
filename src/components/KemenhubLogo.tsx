import React from 'react';

interface KemenhubLogoProps {
  className?: string;
  size?: number;
}

export const KemenhubLogo: React.FC<KemenhubLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Lambang Resmi Perhubungan RI"
      role="img"
    >
      {/* Outer Blue Circle */}
      <circle cx="60" cy="60" r="58" fill="#0B234A" stroke="#E5A823" strokeWidth="3" />
      <circle cx="60" cy="60" r="51" fill="#0E336E" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />

      {/* Decorative Golden Star & Compass Points */}
      <polygon points="60,18 64,30 76,30 66,38 70,50 60,42 50,50 54,38 44,30 56,30" fill="#F4B41A" />

      {/* Stylized Golden Wings (Transportasi) */}
      <path
        d="M20 54 C35 50, 48 56, 58 65 C48 68, 32 67, 20 54 Z"
        fill="#F4B41A"
      />
      <path
        d="M22 62 C34 60, 46 64, 56 73 C46 75, 34 74, 22 62 Z"
        fill="#E5A823"
      />
      <path
        d="M100 54 C85 50, 72 56, 62 65 C72 68, 88 67, 100 54 Z"
        fill="#F4B41A"
      />
      <path
        d="M98 62 C86 60, 74 64, 64 73 C74 75, 86 74, 98 62 Z"
        fill="#E5A823"
      />

      {/* Anchor & Wheel Center (Perhubungan) */}
      <circle cx="60" cy="67" r="16" fill="#0B234A" stroke="#F4B41A" strokeWidth="3" />
      <circle cx="60" cy="67" r="5" fill="#F4B41A" />
      
      {/* Wheel Spokes */}
      <line x1="60" y1="51" x2="60" y2="83" stroke="#F4B41A" strokeWidth="2.5" />
      <line x1="44" y1="67" x2="76" y2="67" stroke="#F4B41A" strokeWidth="2.5" />
      <line x1="49" y1="56" x2="71" y2="78" stroke="#F4B41A" strokeWidth="2" />
      <line x1="49" y1="78" x2="71" y2="56" stroke="#F4B41A" strokeWidth="2" />

      {/* Lower Anchor Ring */}
      <path
        d="M48 83 C54 90, 66 90, 72 83"
        stroke="#F4B41A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="94" r="2.5" fill="#FFFFFF" />
    </svg>
  );
};
