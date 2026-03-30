import { type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[#0054FD] text-white border-none hover:opacity-90 hover:shadow-[0_4px_14px_rgba(0,84,253,0.35)] disabled:bg-[#809EFE] disabled:cursor-not-allowed disabled:shadow-none',
  outline:
    'bg-white text-[#0054FD] border-[1.5px] border-[#D9E0E6] hover:border-zinc-400',
};

function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'flex-1 h-[52px] rounded-full text-base font-medium cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-[#0054FD] focus-visible:outline-offset-2',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
