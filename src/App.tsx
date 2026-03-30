import LoginContainer from './features/signUp/components/LoginContainer'
import OnboardingHeader from './features/signUp/components/OnboardingHeader'

import AccountInfoStep from './features/signUp/steps/AccountInfoStep'
import MobileNoStep from './features/signUp/steps/MobileNoStep'
import MobileOtpStep from './features/signUp/steps/MobileOtpStep'
import PasswordStep from './features/signUp/steps/PasswordStep'
import ProfileStep from './features/signUp/steps/ProfileStep'

import type { JSX } from 'react'
import NtrUser from './assets/NtrUser.png'
import LinearStepper from './features/signUp/components/ProgressBar'
import SuccessPopUp from './features/signUp/components/SuccessPopUp'
import { useSignupFlow } from './features/signUp/hooks/useSignupFlow'
import { SIGNUP_STEPS, type SignupStep } from './features/signUp/types'

import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const {
    currentStep,
    data,
    draft,
    isFirst,
    canContinue,
    updateDraft,
    setStepStateFor,
    setCurrentStep,
    goToNextStep,
    resetSignup,
  } = useSignupFlow()

  const stepConfig: Record<SignupStep, () => JSX.Element> = {
    accountInfo: () => (
      <AccountInfoStep
        accountType={draft.accountType}
        onAccountTypeChange={(accountType) => updateDraft({ accountType })}
        setStepStateFor={setStepStateFor}
        step="accountInfo"
      />
    ),

    mobileNumber: () => (
      <MobileNoStep
        countryCode={draft.countryCode}
        mobileNo={draft.mobileNo}
        onCountryCodeChange={(countryCode) => updateDraft({ countryCode })}
        onMobileNoChange={(mobileNo) => updateDraft({ mobileNo })}
        setStepStateFor={setStepStateFor}
        step="mobileNumber"
      />
    ),

    mobileOtp: () => (
      <MobileOtpStep
        mobileOtp={draft.mobileOtp}
        onMobileOtpChange={(mobileOtp) => updateDraft({ mobileOtp })}
        setStepStateFor={setStepStateFor}
        step="mobileOtp"
      />
    ),

    profile: () => (
      <ProfileStep
        firstName={draft.accountInfo.name}
        lastName={draft.accountInfo.lastName}
        onFirstNameChange={(name) =>
          updateDraft((prev) => ({
            ...prev,
            accountInfo: { ...prev.accountInfo, name },
          }))
        }
        onLastNameChange={(lastName) =>
          updateDraft((prev) => ({
            ...prev,
            accountInfo: { ...prev.accountInfo, lastName },
          }))
        }
        setStepStateFor={setStepStateFor}
        step="profile"
      />
    ),

    password: () => (
      <PasswordStep
        newPassword={draft.newPassword}
        confirmPassword={draft.confirmPassword}
        onNewPasswordChange={(newPassword) => updateDraft({ newPassword })}
        onConfirmPasswordChange={(confirmPassword) => updateDraft({ confirmPassword })}
        setStepStateFor={setStepStateFor}
        step="password"
      />
    ),

    success: () => <div>Successfully signed up</div>,
  };

  const CurrentStepComponent = stepConfig[currentStep]


  const handleBack = () => {
    if (!isFirst) setCurrentStep(SIGNUP_STEPS[SIGNUP_STEPS.indexOf(currentStep) - 1])
    else setCurrentStep('accountInfo')
  }

  return (
    <div className="flex min-h-[100dvh] md:flex-row flex-col bg-[#f5f5f7] p-4">
      <div className="mx-auto my-8 flex min-h-0 min-w-0 w-full max-w-[min(100%,1320px)] flex-1 flex-col gap-8 md:my-12 md:flex-row md:items-stretch md:justify-between md:gap-0">
        <div className="flex flex-col justify-between shrink-1 flex-1">
          <OnboardingHeader />
          <img
            src={NtrUser}
            alt="NTR User"
            className="h-auto w-full h-auto pb-6"
          />
        </div>
        <div className="flex flex-col shrink-1 flex-1">
          <div className="px-10 mb-1">
            <LinearStepper currentStep={currentStep} />
          </div>
          <LoginContainer
            onBack={isFirst ? undefined : handleBack}
            onContinue={goToNextStep}
            disableContinue={!canContinue}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full w-full">
                {CurrentStepComponent()}
              </motion.div>
            </AnimatePresence>
            
          </LoginContainer>
        </div>
      </div>
      {currentStep === 'success' && (
        <SuccessPopUp
          data={data}
          onClick={() => {
            resetSignup()
          }}
        />
      )}
    </div>
  )
};

export default App
