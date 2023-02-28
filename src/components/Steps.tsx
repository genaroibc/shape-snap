import { useState } from 'react';
import { PlatformList } from './PlatformList';
import { UploadZone } from './UploadZone';
import { ImageData, isPlatformName, PlatformName } from '../types';
import { STEP_LIST } from '../constants';
import { StepsBreadCrumb } from './StepsBreadCrumb';
import { StepsNavBar } from './StepsNavBar';
import { TransformImage } from './TransformImage';

export function Steps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformName[]>([]);
  const [userImgData, setUserImgData] = useState<ImageData | null>(null);

  const handleSelectionChange = (e: React.ChangeEvent) => {
    const platformInput = e.target as HTMLInputElement;
    const platformName = platformInput.name;
    const isSelectedPlatform = platformInput.checked;

    if (!platformName || !isPlatformName(platformName)) return;

    setSelectedPlatforms((currentPlatforms) => {
      return isSelectedPlatform
        ? [...currentPlatforms, platformName]
        : currentPlatforms.filter((platform) => platform !== platformName);
    });
  };

  const handleNewUserImageData = (imageData: ImageData | null) => {
    setUserImgData(imageData);
  };

  const stepRequirements: Record<number, boolean> = {
    0: userImgData !== null,
    1: selectedPlatforms.length > 0,
    2: true
  };

  return (
    <section id="playground" className="max-w-5xl w-full flex flex-col gap-4 mx-auto py-12">
      <StepsBreadCrumb currentStep={currentStep} />
      <h3 className="text-3xl my-8">{STEP_LIST[currentStep]}</h3>
      <div className="min-h-[450px]">
        {currentStep === 0 && <UploadZone defaultImgData={userImgData} onNewImgData={handleNewUserImageData} />}
        {currentStep === 1 && (
          <PlatformList selectedPlatforms={selectedPlatforms} onSelectionChange={handleSelectionChange} />
        )}
        {currentStep === 2 && (
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
