import { useState } from 'react';
import { PlatformList } from './PlatformList';
import { UploadZone } from './UploadZone';
import type { ImageData } from '../types';
import { STEP_LIST } from '../constants';
import { StepsBreadCrumb } from './StepsBreadCrumb';
import { StepsNavBar } from './StepsNavBar';
import { TransformImage } from './TransformImage';

export function Steps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [userImgData, setUserImgData] = useState<ImageData | null>(null);

  const handleSelectionChange = (e: React.ChangeEvent) => {
    const platformInput = e.target as HTMLInputElement;
    const platformName = platformInput.name;
    const isSelectedPlatform = platformInput.checked;

    if (!platformName) return;

    setSelectedPlatforms((currentPlatforms) => {
      return isSelectedPlatform
        ? [...currentPlatforms, platformName]
        : currentPlatforms.filter((platform) => platform !== platformName);
    });
  };

  const handleNewUserImageData = (imageData: ImageData) => {
    setUserImgData(imageData);
  };

  const stepRequirements: Record<number, boolean> = {
    0: userImgData !== null,
    1: selectedPlatforms.length > 0,
    2: true
  };

  return (
    <section id="playground" className="max-w-7xl grid place-content-center gap-4 mx-auto py-12">
      <StepsBreadCrumb currentStep={currentStep} />
      <h3 className="text-3xl my-8">{STEP_LIST[currentStep]}</h3>
      <div className="min-h-[450px]">
        {currentStep === 0 && <UploadZone defaultImgData={userImgData} onNewImgData={handleNewUserImageData} />}
        {currentStep === 1 && (
          <PlatformList selectedPlatforms={selectedPlatforms} onSelectionChange={handleSelectionChange} />
        )}
        {currentStep === 2 && (
          <div className="w-full mx-auto text-center flex flex-col gap-4">
            {userImgData ? (
              <img className="w-48 mx-auto border-4 rounded-md" src={userImgData.src} alt={userImgData.title} />
            ) : (
              <p className="text-red-500 text-2xl">No image provided, please upload one</p>
            )}
            {selectedPlatforms.map((platformName) => (
              <span className="font-bold" key={platformName}>
                {platformName}
              </span>
            ))}
          </div>
        )}
        {currentStep === 3 && (
          <>{userImgData && <TransformImage platformList={selectedPlatforms} imageData={userImgData} />}</>
        )}
      </div>

      <StepsNavBar
        canGoToNextStep={stepRequirements[currentStep]}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </section>
  );
}
