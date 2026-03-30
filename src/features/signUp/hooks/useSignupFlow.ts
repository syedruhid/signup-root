import { useCallback, useEffect, useRef, useState } from 'react'
import { passwordsMatchAndValid } from '../utils/passwordRules'
import {
  SIGNUP_STEPS,
  draftFromData,
  type SignupData,
  type SignupDraft,
  type SignupStep,
} from '../types'

type StepState = {
  isValid: boolean
  isLoading?: boolean
}

const initialData: SignupData = {
  accountType: 'personal',
  countryCode: '+1',
  mobileNo: '',
  mobileOtp: '',
  accountInfo: { name: '', lastName: '' },
  email: 'dev@root.com',
  password: '',
}

export function useSignupFlow() {
  const [currentStep, setCurrentStep] = useState<SignupStep>('accountInfo')
  const [data, setData] = useState<SignupData>(initialData)
  const [draft, setDraft] = useState<SignupDraft>(() => draftFromData(initialData))

  const draftRef = useRef(draft)
  draftRef.current = draft

  const dataRef = useRef(data)
  dataRef.current = data

  const [stepState, setStepState] = useState<Partial<Record<SignupStep, StepState>>>({
    accountInfo: { isValid: true },
    mobileNumber: { isValid: false },
    mobileOtp: { isValid: false },
    profile: { isValid: false },
    password: { isValid: false },
    success: { isValid: false },
  })

  const stepIndex = SIGNUP_STEPS.indexOf(currentStep)
  const isFirst = stepIndex === 0
  const isLast = stepIndex === SIGNUP_STEPS.length - 1
  const currentStepState = stepState[currentStep] ?? { isValid: false }
  const canContinue = currentStepState.isValid && !currentStepState.isLoading
  const isLoading = currentStepState.isLoading ?? false

  useEffect(() => {
    const currentData = dataRef.current
    setDraft((prev) => {
      switch (currentStep) {
        case 'accountInfo':
          return { ...prev, accountType: currentData.accountType }
        case 'mobileNumber':
          return { ...prev, countryCode: currentData.countryCode, mobileNo: currentData.mobileNo }
        case 'mobileOtp':
          return { ...prev, mobileOtp: currentData.mobileOtp }
        case 'profile':
          return { ...prev, accountInfo: { ...currentData.accountInfo } }
        case 'password':
          return { ...prev, newPassword: '', confirmPassword: '' }
        default:
          return prev
      }
    })
  }, [currentStep])

  const updateDraft = useCallback(
    (arg: Partial<SignupDraft> | ((prev: SignupDraft) => SignupDraft)) => {
      setDraft((prev) => (typeof arg === 'function' ? arg(prev) : { ...prev, ...arg }))
    },
    [],
  )

  const setStepStateFor = useCallback((step: SignupStep, state: StepState) => {
    setStepState((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...state,
      },
    }))
  }, [])

  const updateData = useCallback((partial: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }, [])

  const commitCurrentStep = useCallback((): boolean => {
    const d = draftRef.current
    switch (currentStep) {
      case 'accountInfo':
        setData((prev) => ({ ...prev, accountType: d.accountType }))
        return true
      case 'mobileNumber':
        if (d.mobileNo.length <= 6) return false
        setData((prev) => ({
          ...prev,
          countryCode: d.countryCode,
          mobileNo: d.mobileNo,
        }))
        return true
      case 'mobileOtp':
        if (d.mobileOtp.length !== 4 || !/^\d{4}$/.test(d.mobileOtp)) return false
        setData((prev) => ({ ...prev, mobileOtp: d.mobileOtp }))
        return true
      case 'profile': {
        const total =
          d.accountInfo.name.trim().length + d.accountInfo.lastName.trim().length
        if (total < 4) return false
        setData((prev) => ({
          ...prev,
          accountInfo: { ...d.accountInfo },
        }))
        return true
      }
      case 'password':
        if (!passwordsMatchAndValid(d.newPassword, d.confirmPassword)) return false
        setData((prev) => ({ ...prev, password: d.newPassword }))
        return true
      default:
        return true
    }
  }, [currentStep])

  const goToNextStep = useCallback(() => {
    if (!canContinue) return
    if (!commitCurrentStep()) return
    const i = SIGNUP_STEPS.indexOf(currentStep)
    if (i >= 0 && i < SIGNUP_STEPS.length - 1) {
      setCurrentStep(SIGNUP_STEPS[i + 1])
    }
  }, [canContinue, commitCurrentStep, currentStep])

  const resetSignup = useCallback(() => {
    setData(initialData)
    setDraft(draftFromData(initialData))
    setCurrentStep('accountInfo')
  }, [])

  return {
    currentStep,
    data,
    draft,
    updateDraft,
    updateData,
    isFirst,
    isLast,
    canContinue,
    isLoading,
    setStepStateFor,
    setCurrentStep,
    goToNextStep,
    resetSignup,
  }
}
