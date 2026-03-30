import { useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Typography from '../../../components/ui/Typography';
import type { SignupStep, StepState } from '../types';

interface ProfileStepProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  setStepStateFor: (step: SignupStep, state: StepState) => void;
  step: SignupStep;
}

const MIN_NAME_LENGTH = 4;
const NAME_REGEX = /^[a-zA-Z\s]*$/;

export default function ProfileStep({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  setStepStateFor,
  step,
}: ProfileStepProps) {
  
  const nameFields = [
    { label: 'First Name', placeholder: 'Oliver' },
    { label: 'Last Name', placeholder: 'Last Name' },
  ];

  useEffect(() => {
    const totalLength = firstName.trim().length + lastName.trim().length;
    setStepStateFor(step, { isValid: totalLength >= MIN_NAME_LENGTH });
  }, [firstName, lastName, setStepStateFor, step]);

  const handleFirstNameChange = (value: string) => {
    if (!NAME_REGEX.test(value)) return;
    onFirstNameChange(value);
  };

  const handleLastNameChange = (value: string) => {
    if (!NAME_REGEX.test(value)) return;
    onLastNameChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h3" fontVariant="primary" customClassName="font-medium mb-8">
        What is your name?
      </Typography>
      {nameFields.map((field) => (
        <div key={field.label} className="flex flex-col gap-1">
          <Typography variant="small" fontVariant="tertiary" className="pl-1">
            {field.label}
          </Typography>
          <Input
            type="text"
            placeholder={field.placeholder}
            value={field.label === 'First Name' ? firstName : lastName}
            onChange={(e) =>
              field.label === 'First Name'
                ? handleFirstNameChange(e.target.value)
                : handleLastNameChange(e.target.value)
            }
            className="placeholder:text-[#D9E0E6] placeholder:text-xs md:w-[85%]"
          />
        </div>
      ))}
    </div>
  );
}
