import { SetStateAction } from 'react';
import { TOTAL_STEPS } from '../constants';

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
  canGoToNextStep: boolean;
};

export function StepsNavBar({ currentStep, setCurrentStep, canGoToNextStep }: Props) {
  return (
    <footer>
      <nav className="flex gap-4 w-full justify-center p-4">
        <button disabled={currentStep < 1} onClick={() => setCurrentStep((p) => (p > 1 ? p - 1 : 0))}>
          prev
        </button>

        <button
          disabled={!canGoToNextStep || currentStep === TOTAL_STEPS - 1}
          onClick={() => setCurrentStep((p) => (p === TOTAL_STEPS ? TOTAL_STEPS : p + 1))}
        >
          next
        </button>
      </nav>
    </footer>
  );
}
