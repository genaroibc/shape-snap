import { useState } from 'react';
import { PlatformList } from './PlatformList';
import { UploadZone } from './UploadZone';

const STEPS_TITLES = ['Upload your images', 'Select social media platforms', 'Customize'];
const TOTAL_STEPS = STEPS_TITLES.length;

export function Steps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({});

  const handleSelectionChange = (e: React.ChangeEvent) => {
    const platformInput = e.target as HTMLInputElement;
    const platformName = platformInput.name;
    const isSelectedPlatform = platformInput.checked;

    if (!platformName) return;

    setSelectedPlatforms((currentPlatforms) => ({ ...currentPlatforms, [platformName]: isSelectedPlatform }));
  };

  return (
    <section id="playground" className="max-w-7xl flex flex-col gap-4 mx-auto min-h-screen py-12">
      <nav className="flex gap-6 text-xl">
        {STEPS_TITLES.map((stepTitle, index) => (
          <span
            className={`after:content-['>'] relative after:absolute
              after:-right-4 last-of-type:after:content-[''] ${currentStep === index ? 'underline' : ''}`}
            key={index}
          >
            {stepTitle}
          </span>
        ))}
      </nav>
      <progress value={currentStep} max={TOTAL_STEPS} className="w-full" />
      <h3 className="text-4xl my-8">{STEPS_TITLES[currentStep]}</h3>
      {currentStep === 0 && <UploadZone />}
      {currentStep === 1 && <PlatformList onSelectionChange={handleSelectionChange} />}
      {currentStep === 2 && <h5>another</h5>}
      {currentStep === 3 && <h5>another</h5>}

      {currentStep > 0 && <button onClick={() => setCurrentStep((p) => (p > 1 ? p - 1 : 0))}>prev</button>}
      {currentStep < TOTAL_STEPS && (
        <button onClick={() => setCurrentStep((p) => (p === TOTAL_STEPS ? TOTAL_STEPS : p + 1))}>next</button>
      )}

      <button disabled={currentStep !== TOTAL_STEPS}>Generate images</button>
      {JSON.stringify(selectedPlatforms)}
    </section>
  );
}
