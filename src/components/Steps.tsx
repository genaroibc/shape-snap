import { useState } from 'react';
import { PlatformList } from './PlatformList';
import { UploadZone } from './UploadZone';
import type { ImageData } from '../types';
import { STEP_LIST } from '../constants';
import { StepsBreadCrumb } from './StepsBreadCrumb';
import { StepsNavBar } from './StepsNavBar';

export function Steps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({});
  const [userImgData, setUserImgData] = useState<ImageData | null>(null);

  const handleSelectionChange = (e: React.ChangeEvent) => {
    const platformInput = e.target as HTMLInputElement;
    const platformName = platformInput.name;
    const isSelectedPlatform = platformInput.checked;

    if (!platformName) return;

    setSelectedPlatforms((currentPlatforms) => ({ ...currentPlatforms, [platformName]: isSelectedPlatform }));
  };

  const handleNewUserImageData = (imageData: ImageData) => {
    setUserImgData(imageData);
  };

  return (
    <section id="playground" className="max-w-7xl grid place-content-center gap-4 mx-auto min-h-screen py-12">
      <StepsBreadCrumb currentStep={currentStep} />
      <h3 className="text-4xl my-8">{STEP_LIST[currentStep]}</h3>
      <div className="min-h-[450px]">
        {currentStep === 0 && <UploadZone defaultImgData={userImgData} onNewImgData={handleNewUserImageData} />}
        {currentStep === 1 && (
          <PlatformList
            selectedPlatforms={Object.keys(selectedPlatforms).filter(([, isSelected]) => isSelected)}
            onSelectionChange={handleSelectionChange}
          />
        )}
        {currentStep === 2 && (
          <div className="max-w-xs w-full mx-auto text-center flex flex-col gap-4">
            {userImgData && (
              <img className="w-48 mx-auto border-4 rounded-md" src={userImgData.src} alt={userImgData.title} />
            )}
            {Object.entries(selectedPlatforms).map(([name, isSelected]) => (
              <span className="font-bold" key={name}>
                {isSelected && name}
              </span>
            ))}
          </div>
        )}
      </div>

      <StepsNavBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </section>
  );
}
