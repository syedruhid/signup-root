import { useEffect, useRef, useState } from 'react';
import Input from '../../../components/ui/Input';
import Typography from '../../../components/ui/Typography';
import type { SignupStep, StepState } from '../types';
import Loader from '../../../components/ui/Loader';

interface MobileOtpStepProps {
  mobileOtp: string;
  onMobileOtpChange: (otp: string) => void;
  setStepStateFor: (step: SignupStep, state: StepState) => void;
  step: SignupStep;
}

const OTP_REGEX = /^\d{4}$/
const LOADER_TIME = 1500;

export default function MobileOtpStep({ mobileOtp, onMobileOtpChange, setStepStateFor, step }: MobileOtpStepProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 4 }, (_, i) => mobileOtp[i] ?? '');
  const [loader, setLoader] = useState(false);

  const setDigit = (index: number, value: string) => {
    const next = Array.from({ length: 4 }, (_, i) => mobileOtp[i] ?? '');
    next[index] = value;
    onMobileOtpChange(next.join('').slice(0, 4));
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    setDigit(index, value);
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key !== 'Backspace') return;
    if (digits[index]) {
      setDigit(index, '');
    } else if (index > 0) {
      setDigit(index - 1, '');
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    setLoader(true);
    onMobileOtpChange('');
    inputsRef.current[0]?.focus();
    setTimeout(() => {
      setLoader(false);
    }, LOADER_TIME)
  };

  useEffect(() => {
    setStepStateFor(step, { isValid: mobileOtp.length === 4 && OTP_REGEX.test(mobileOtp) });
  }, [mobileOtp, setStepStateFor, step]);

  if (loader) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <Loader />
        <Typography variant="small" fontVariant="tertiary">
          Sending OTP...
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" fontVariant="primary" customClassName="font-medium mb-12">
        OTP Verification
      </Typography>
      <Typography variant="small" fontVariant="tertiary">
        An OTP has been sent to your mobile number
      </Typography>
      <div className="flex items-center md:gap-12 gap-4 mt-1">
        {[0, 1, 2, 3].map((index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            value={digits[index]}
            maxLength={1}
            className="w-12 h-12 text-center border rounded-md text-lg"
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <div className="text-center mt-4">
        <Typography variant="small" fontVariant="tertiary">
          Did not receive OTP?{' '}
          <button type="button" onClick={handleResendOtp} className="text-[#0054FD] cursor-pointer">
            Resend OTP
          </button>
        </Typography>
      </div>
    </div>
  );
}
