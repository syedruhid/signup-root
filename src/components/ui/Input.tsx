import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  trailingIcon?: ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, trailingIcon, wrapperClassName, ...props }, ref) => {
    const baseField =
      'w-full px-4 py-3 border-1 border-[#D9E0E6] rounded-lg text-base outline-none transition-colors focus:border-[#0054FD]';

    if (!trailingIcon) {
      return (
        <input
          ref={ref}
          className={cn(baseField, error && 'border-red-500 focus:border-red-500', className)}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          'flex min-w-0 items-stretch overflow-hidden rounded-lg border border-[#D9E0E6] bg-white transition-colors focus-within:border-[#0054FD]',
          error && 'border-red-500 focus-within:border-red-500',
          wrapperClassName,
        )}
      >
        <input
          ref={ref}
          className={cn(
            'min-w-0 flex-1 border-0 bg-transparent py-3 pl-4 pr-2 text-base outline-none ring-0 focus:ring-0 focus:outline-none',
            className,
          )}
          {...props}
        />
        <span className="flex shrink-0 items-center pr-3 [&>*]:pointer-events-auto">{trailingIcon}</span>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
