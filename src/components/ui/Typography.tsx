import { type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
type FontVariant = 'primary' | 'secondary' | 'tertiary';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  fontVariant?: FontVariant;
  as?: ElementType;
  customClassName?: string;
}

const variantStyles: Record<Variant, string> = {
  h1: 'text-4xl leading-tight',
  h2: 'text-2xl leading-snug',
  h3: 'text-xl leading-snug',
  body: 'text-base leading-normal',
  caption: 'text-sm leading-normal',
  small: 'text-xs leading-normal',
};

const defaultTags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  caption: 'p',
  small: 'span',
};

const fontVariantStyles: Record<FontVariant, string> = {
  primary: 'text-[#132C4A]',
  secondary: 'text-[#132C4A]/70',
  tertiary: 'text-[#8292A1]',
};

function Typography({
  variant = 'body',
  fontVariant = 'primary',
  as,
  customClassName,
  className,
  children,
  ...props
}: TypographyProps) {
  const Tag = as ?? defaultTags[variant];

  return (
    <Tag
      className={cn(
        'font-rubik',
        variantStyles[variant],
        fontVariantStyles[fontVariant],
        customClassName,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Typography;
