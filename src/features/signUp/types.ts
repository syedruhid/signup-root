export const SIGNUP_STEPS: SignupStep[] = [
  'accountInfo',
  'mobileNumber',
  'mobileOtp',
  'profile',
  'password',
  'success',
];

export type AccountType = 'personal' | 'business';

export type SignupDraft = {
  accountType: AccountType;
  countryCode: string;
  mobileNo: string;
  mobileOtp: string;
  accountInfo: { name: string; lastName: string };
  newPassword: string;
  confirmPassword: string;
};

export function draftFromData(data: SignupData): SignupDraft {
  return {
    accountType: data.accountType,
    countryCode: data.countryCode,
    mobileNo: data.mobileNo,
    mobileOtp: data.mobileOtp,
    accountInfo: { ...data.accountInfo },
    newPassword: '',
    confirmPassword: '',
  };
};

export interface SignupData {
  accountType: AccountType;
  countryCode: string;
  mobileNo: string;
  mobileOtp: string;
  accountInfo: {
    name: string;
    lastName: string;
  };
  email: string;
  password: string;
};

export type SignupStep = 'accountInfo' | 'mobileNumber' | 'mobileOtp' | 'profile' | 'password' | 'success';

export type StepState = {
  isValid: boolean
  isLoading?: boolean
};
