import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OnboardingContextType {
  isCompleted: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const ONBOARDING_COMPLETED_KEY = "linear-onboarding-completed";
const ONBOARDING_STEP_KEY = "linear-onboarding-step";

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [isCompleted, setIsCompleted] = useState(() => {
    return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
  });

  const [currentStep, setCurrentStepState] = useState(() => {
    const savedStep = localStorage.getItem(ONBOARDING_STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  useEffect(() => {
    if (!isCompleted) {
      localStorage.setItem(ONBOARDING_STEP_KEY, currentStep.toString());
    }
  }, [currentStep, isCompleted]);

  const setCurrentStep = (step: number) => {
    setCurrentStepState(step);
  };

  const completeOnboarding = () => {
    setIsCompleted(true);
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
    localStorage.removeItem(ONBOARDING_STEP_KEY);
  };

  const resetOnboarding = () => {
    setIsCompleted(false);
    setCurrentStepState(0);
    localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    localStorage.removeItem(ONBOARDING_STEP_KEY);
  };

  return (
    <OnboardingContext.Provider
      value={{
        isCompleted,
        currentStep,
        setCurrentStep,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

