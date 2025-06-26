import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

const base = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 rounded-md focus:ring-blue-500 cursor-pointer',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-md focus:ring-gray-500 cursor-pointer',
  danger: 'bg-red-600 text-white hover:bg-red-700  rounded-md focus:ring-red-500 cursor-pointer',
};
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
