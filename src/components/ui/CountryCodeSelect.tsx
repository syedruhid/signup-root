import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { countryCodes, type CountryCode } from '../../lib/constants/countryCodes';
import Typography from './Typography';
import Button from './Button';

interface CountryCodeSelectProps {
  value: string;
  onChange: (dialCode: string) => void;
  className?: string;
}

function CountryCodeSelect({ value, onChange, className }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = countryCodes.find((c) => c.dialCode === value);

  const filtered = search
    ? countryCodes.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dialCode.includes(search),
      )
    : countryCodes;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  function handleSelect(c: CountryCode) {
    onChange(c.dialCode);
    setOpen(false);
    setSearch('');
  }

  return (
    <div ref={ref} className={cn('relative shrink-0', className)}>
      <Button
        variant='outline'
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-1 h-full px-3 py-3 border border-[#D9E0E6] rounded-lg text-sm font-medium cursor-pointer bg-white transition-colors focus:border-[#0054FD] outline-none whitespace-nowrap',
          open && 'border-[#0054FD]',
        )}
      >
        <Typography fontVariant='tertiary' className='text-xs p-1'>
          {selected?.dialCode ?? value}
        </Typography>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={cn('transition-transform', open && 'rotate-180')}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="#8292A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-auto bg-white border border-[#D9E0E6] rounded-lg shadow-lg z-50">
          <div className="sticky top-0 bg-white p-2 border-b border-[#D9E0E6]">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-2 py-1.5 text-sm border border-[#D9E0E6] rounded outline-none focus:border-[#0054FD] placeholder:text-[#8292A1]"
            />
          </div>
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-sm text-[#8292A1]">No results</div>
          )}
          {filtered.map((c) => (
            <Button
              variant='outline'
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                'flex border-0 rounded-none items-center gap-2 w-full px-3 py-2 text-sm text-left cursor-pointer hover:bg-gray-50 transition-colors',
                c.dialCode === value && 'bg-blue-50 text-[#0054FD]',
              )}
            >
              <span className="w-10 shrink-0 font-medium">{c.dialCode}</span>
              <span className="truncate text-[#132C4A]/70">{c.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryCodeSelect;
