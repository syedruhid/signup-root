import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BusinessAccountSvg, PersonalAccountSvg } from '../../../assets/customSvg/accountTypeSvg';
import Typography from '../../../components/ui/Typography';
import { cn } from '../../../lib/utils';
import type { AccountType, SignupStep, StepState } from '../types';

interface AccountInfoStepProps {
  accountType: AccountType;
  onAccountTypeChange: (accountType: AccountType) => void;
  setStepStateFor: (step: SignupStep, state: StepState) => void;
  step: SignupStep;
}

const options: { value: AccountType; label: string; icon: typeof PersonalAccountSvg }[] = [
  { value: 'personal', label: 'Personal', icon: PersonalAccountSvg },
  { value: 'business', label: 'Business', icon: BusinessAccountSvg },
];

function AccountInfoStep({ accountType, onAccountTypeChange, setStepStateFor, step }: AccountInfoStepProps) {
  const handleChange = (acctType: AccountType) => {
    onAccountTypeChange(acctType);
    setStepStateFor(step, { isValid: true });
  };

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="body" fontVariant="secondary" customClassName="text-lg md:w-[60%] font-normal">
        To join us tell us{' '}
        <Typography as="span" variant="body" fontVariant="primary" customClassName="text-lg font-medium">
          what type of account
        </Typography>{' '}
        you are opening
      </Typography>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const selected = accountType === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleChange(opt.value)}
              className={cn(
                'flex items-center gap-4 w-[85%] p-4 rounded-2xl border-1 text-left transition-all cursor-pointer shadow-[0px_4px_8px_0px_#BCCBDB4D]',
                selected ? 'border-[#0054FD]' : 'border-[#D9E0E6] hover:border-[#0054FD]',
              )}
            >
              <Icon color={selected ? '#0054FD' : '#132C4A'} />
              <Typography
                as="span"
                variant="body"
                fontVariant="secondary"
                customClassName={cn(selected ? 'text-[#0054FD]' : 'text-gray-800')}
              >
                {opt.label}
              </Typography>
              {selected && (
                <span className="ml-auto">
                  <FontAwesomeIcon icon={faCircleCheck} color="#0054FD" style={{ fontSize: '25px' }} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AccountInfoStep;
