import { cn } from '../../lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-dark-700 dark:text-dark-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-lg border border-dark-300 bg-white px-3 py-2 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500',
            error && 'border-oracle-500 focus:ring-oracle-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-oracle-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
