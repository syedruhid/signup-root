import { useEffect } from 'react';
import CountryCodeSelect from '../../../components/ui/CountryCodeSelect';
import Input from '../../../components/ui/Input';
import Typography from '../../../components/ui/Typography';
import type { SignupStep, StepState } from '../types';

interface MobileNoStepProps {
  countryCode: string;
  mobileNo: string;
  onCountryCodeChange: (code: string) => void;
  onMobileNoChange: (value: string) => void;
  setStepStateFor: (step: SignupStep, state: StepState) => void;
  step: SignupStep;
}

const MOBILE_NO_REGEX = /^[0-9]*$/;

export default function MobileNoStep({
  countryCode,
  mobileNo,
  onCountryCodeChange,
  onMobileNoChange,
  setStepStateFor,
  step,
}: MobileNoStepProps) {
  
  const handleMobileNoChange = (value: string) => {
    if (!MOBILE_NO_REGEX.test(value)) return;
    onMobileNoChange(value);
  };

  useEffect(() => {
    setStepStateFor(step, { isValid: mobileNo.length > 6 });
  }, [mobileNo, setStepStateFor, step]);

  return (
    <div>
      <Typography variant="h2" fontVariant="primary" customClassName="font-medium mb-12">
        OTP Verification
      </Typography>
      <Typography variant="small" fontVariant="tertiary">
        Mobile Number <span className="text-[#FF7C52]">*</span>
      </Typography>
      <div className="flex items-center gap-4">
        <CountryCodeSelect
          value={countryCode}
          onChange={(code) => {
            onCountryCodeChange(code);
            onMobileNoChange('');
          }}
        />
        <Input
          type="tel"
          placeholder="8343989239"
          value={mobileNo}
          onChange={(e) => handleMobileNoChange(e.target.value)}
          className="placeholder:text-[#8292A1] placeholder:text-xs w-[70%]"
        />
      </div>
    </div>
  );
}
