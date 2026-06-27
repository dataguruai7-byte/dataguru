import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700': variant === 'primary',
            'bg-dark-100 text-dark-900 hover:bg-dark-200 dark:bg-dark-800 dark:text-dark-100 dark:hover:bg-dark-700': variant === 'secondary',
            'border border-dark-300 bg-transparent hover:bg-dark-100 dark:border-dark-700 dark:hover:bg-dark-800': variant === 'outline',
            'hover:bg-dark-100 dark:hover:bg-dark-800': variant === 'ghost',
            'bg-oracle-600 text-white hover:bg-oracle-700': variant === 'danger',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };
