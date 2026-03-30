import { type ReactNode } from 'react';
import Typography from '../../../components/ui/Typography';
import { cn } from '../../../lib/utils';
import Button from '../../../components/ui/Button';

interface LoginContainerProps {
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  backLabel?: string;
  continueLabel?: string;
  disableContinue?: boolean;
}

function LoginContainer({
  children,
  onBack,
  onContinue,
  backLabel = 'Back',
  continueLabel = 'Continue',
  disableContinue = false,
}: LoginContainerProps) {
  return (
    <div className="flex flex-col flex-1 shrink min-w-0 w-full p-10 min-h-[min(70vh,708px)] rounded-2xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.08)]">
  
    <div className="flex-1 min-w-0">
      {children}
    </div>
      <div className="mt-auto flex flex-col sm:flex-row justify-center gap-4">
        <Button
          type="button"
          variant='outline'
          className={cn(
            "min-h-[49px] w-full sm:max-w-[250px] min-w-0 rounded-full text-base font-medium cursor-pointer transition-all border-[1px] border-[#D9E0E6] bg-white text-[#0054FD] hover:border-zinc-400",
            !onBack && 'opacity-50 cursor-not-allowed'
          )}
          onClick={onBack}
          disabled={!onBack}
        >
          <Typography variant="body" className='text-[#0054FD] text-xs truncate'>
            {backLabel}
          </Typography>
        </Button>

        {onContinue && (
          <Button
            type="button"
            className="min-h-[49px] w-full sm:max-w-[250px] min-w-0 rounded-full text-base font-medium cursor-pointer transition-all border-none bg-[#0054FD] text-white hover:opacity-90 disabled:bg-[#809EFE]"
            onClick={onContinue}
            disabled={disableContinue}
          >
            <Typography variant="body" className='text-white text-xs truncate'>
              {continueLabel}
            </Typography>
          </Button>
        )}
      </div>
    </div>
  );
}

export default LoginContainer;
