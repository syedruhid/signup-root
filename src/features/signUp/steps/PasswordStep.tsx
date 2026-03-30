import { useEffect, useRef, useState } from "react";
import { EyeIcon } from "../../../assets/customSvg/genericIcons";
import Input from "../../../components/ui/Input";
import Typography from "../../../components/ui/Typography";
import { cn } from "../../../lib/utils";
import { usePasswordValid } from "../hooks/usePasswordValid";
import type { SignupStep, StepState } from "../types";

enum PASSWORD_INPUT_TYPE {
  NEW_PASSWORD = 'newPassword',
  CONFIRM_PASSWORD = 'confirmPassword',
}
enum PASSWORD_FIELD_TYPE {
  PASSWORD = 'password',
  TEXT = 'text',
}

interface PasswordStepProps {
  newPassword: string;
  confirmPassword: string;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  setStepStateFor: (step: SignupStep, state: StepState) => void;
  step: SignupStep;
}

export default function PasswordStep({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  setStepStateFor,
  step,
}: PasswordStepProps) {

  const [newPasswordFieldType, setNewPasswordFieldType] = useState<PASSWORD_FIELD_TYPE>(
    PASSWORD_FIELD_TYPE.PASSWORD,
  );
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] = useState<PASSWORD_FIELD_TYPE>(
    PASSWORD_FIELD_TYPE.PASSWORD,
  );
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const { newPasswordError, confirmPasswordError } = usePasswordValid(newPassword, confirmPassword);

  useEffect(() => {
    setStepStateFor(step, {
      isValid:
        newPasswordError.trim().length === 0 &&
        confirmPasswordError.trim().length === 0,
    });
  }, [newPasswordError, confirmPasswordError, setStepStateFor, step]);

  const passWordFields = [
    {
      key: PASSWORD_INPUT_TYPE.NEW_PASSWORD,
      inputRef: passwordInputRef,
      label: "Enter new password",
      placeholder: "Enter new password",
      bottomText: newPasswordError,
      value: newPassword,
      onChange: onNewPasswordChange,
      inputType: newPasswordFieldType,
    },
    {
      key: PASSWORD_INPUT_TYPE.CONFIRM_PASSWORD,
      inputRef: confirmPasswordInputRef,
      label: "Confirm password",
      placeholder: "Confirm password",
      bottomText: confirmPasswordError,
      value: confirmPassword,
      onChange: onConfirmPasswordChange,
      inputType: confirmPasswordFieldType,
    },
  ];

  const onShowIconClick = (fieldKey: PASSWORD_INPUT_TYPE) => {
    if (fieldKey === PASSWORD_INPUT_TYPE.NEW_PASSWORD) {
      setNewPasswordFieldType((t) =>
        t === PASSWORD_FIELD_TYPE.PASSWORD ? PASSWORD_FIELD_TYPE.TEXT : PASSWORD_FIELD_TYPE.PASSWORD,
      );
    } else {
      setConfirmPasswordFieldType((t) =>
        t === PASSWORD_FIELD_TYPE.PASSWORD ? PASSWORD_FIELD_TYPE.TEXT : PASSWORD_FIELD_TYPE.PASSWORD,
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography
        variant="h3"
        fontVariant="primary"
        customClassName="font-medium mb-8"
      >
        Create Password for your account
      </Typography>

      {passWordFields.map((field) => (
        <div key={field.label} className="flex flex-col gap-1 mb-2">
          <Typography variant="small" className="pl-1 text-[#8292A1]">
            {field.label}
          </Typography>
          <Input
            ref={field.inputRef}
            type={field.inputType}
            onPaste={(e) => e.preventDefault()}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="placeholder:text-[#D9E0E6] placeholder:text-xs"
            wrapperClassName={cn(
              'w-[85%]',
              field.key === PASSWORD_INPUT_TYPE.CONFIRM_PASSWORD &&
                confirmPassword.length > 0 &&
                confirmPasswordError.length > 0 &&
                document.activeElement === field.inputRef.current &&
                'border-red-500 focus-within:border-red-500',
              field.key === PASSWORD_INPUT_TYPE.NEW_PASSWORD &&
                newPasswordError.length > 0 &&
                document.activeElement === field.inputRef.current &&
                'border-red-500 focus-within:border-red-500',
            )}
            trailingIcon={
              <button
                type="button"
                aria-label={
                  field.inputType === PASSWORD_FIELD_TYPE.PASSWORD ? 'Show password' : 'Hide password'
                }
                className="cursor-pointer rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#0054FD] focus-visible:ring-offset-1"
                onClick={() => onShowIconClick(field.key)}
              >
                <EyeIcon color="#0054FD" />
              </button>
            }
          />
          <Typography variant="small" className="pl-1 text-[#8292A1] w-[80%]">
            {field.bottomText}
          </Typography>
        </div>
      ))}
    </div>
  );
}
