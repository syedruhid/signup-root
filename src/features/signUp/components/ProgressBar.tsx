import type { SignupStep } from "../types";

interface LinearStepperProps {
    currentStep: SignupStep;
}

const LinearStepper = ({ currentStep }: LinearStepperProps) => {
    const stepProgress: Record<SignupStep, number> = {
        accountInfo: 0,
        mobileNumber: 15,
        mobileOtp: 45,
        profile: 60,
        password: 75,
        success: 100,
    };

    const progress = stepProgress[currentStep] ?? 0;

    if (progress <= 0) {
        return null;
    }

    return (
        <div className="w-full bg-[transparent] h-1.5 rounded-2xl border-1 border-[#0054FD]">
            <div
                className="h-full bg-[#0054FD] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default LinearStepper;