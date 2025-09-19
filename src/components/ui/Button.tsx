'use client';

import { ComponentProps, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'danger' | 'secondary';
}

const variantStyles = {
  primary: 'bg-blue-500 text-white hover:bg-blue-700',
  danger: 'bg-red-500 text-white hover:bg-red-700',
  secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
};

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyle =
    'font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}
