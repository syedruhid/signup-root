import { cn } from '../../lib/utils';

interface LoaderProps {
  className?: string;
}

function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        'w-25 h-25 flex justify-center items-center border-1 border-zinc-200 border-t-[#0054FD] rounded-full animate-spin',
        className,
      )}
    />
  );
}

export default Loader;
