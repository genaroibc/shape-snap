import { useEffect, useState } from 'react';
import { readImageFile } from '../utils/readImageFile';
import type { ImageData } from '../types';
import { DemoImages } from './DemoImages';
import { UploadedImage } from './UploadedImage';

type Props = {
  onNewImgData: (imageData: ImageData | null) => void;
  initialImgData: ImageData | null;
};

export function UploadZone({ initialImgData, onNewImgData }: Props) {
  const [imgData, setImgData] = useState<ImageData | null>(initialImgData);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const { src, title } = imgData ?? {};
    const isValidImgData = src && title;
    const isRemovedImg = imgData === null;

    if (isValidImgData || isRemovedImg) {
      onNewImgData(imgData);
    }
  }, [imgData]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const draggedData = event.dataTransfer;
    const imageFile = draggedData.files[0];

    handleReadImgFiles(imageFile);
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target as HTMLInputElement;
    const imageFiles = inputFile?.files;

    if (!imageFiles) return setError('No images found, please try again');

    handleReadImgFiles(imageFiles[0]);
  };

  const handleReadImgFiles = (imageFile: File) => {
    if (!imageFile) return setError('No images found, please try again');

    readImageFile(imageFile).then((result) => {
      if (!result.ok) return setError(result.error);

      setImgData(result.data);
      setError(null);
    });
  };

  type HandleToggleDraggingProps = { event: React.DragEvent; isDragging: boolean };
  const handleToggleDragging = ({ event, isDragging }: HandleToggleDraggingProps) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(isDragging);
  };

  const handleSelectImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { src: imageSrc, alt: imageTitle } = e.target as HTMLImageElement;
    const imageExtension = imageSrc.split('.').at(-1);

    if (!imageExtension) return setError('No image found. Please try again');

    try {
      const response = await fetch(imageSrc);
      const imageBlob = await response.blob();

      const imageFile = new File([imageBlob], imageTitle, { type: `image/${imageExtension}` });
      handleReadImgFiles(imageFile);
    } catch (error) {
      setError('There was an error reading the image. Please try again');
    }
  };

  return (
    <section className="lg:p-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-4">
      <div className="flex flex-col gap-4">
        <label htmlFor="browse-files">
          <section
            draggable
            onDrop={handleDrop}
            onDragEnter={(event) => handleToggleDragging({ event, isDragging: true })}
            onDragOver={(event) => handleToggleDragging({ event, isDragging: true })}
            onDragLeave={(event) => handleToggleDragging({ event, isDragging: false })}
            className={`w-full grid hover:cursor-pointer hover:scale-110 md:hover:scale-120 hover:shadow-2xl place-content-center gap-2 text-center max-w-80 mx-auto border-black border-dashed border-4 rounded-3xl transition-scale duration-200 ${
              isDragging ? 'scale-125' : 'bg-transparent'
            }`}
          >
            <img src="/assets/svg/upload-image.svg" alt="Upload your images here" />
            <input hidden name="browse-files" id="browse-files" type="file" onChange={handleInputFileChange} />
          </section>
        </label>

        <p>or try one of these</p>
        <DemoImages onSelect={handleSelectImage} />
      </div>

      <UploadedImage error={error} handleRemoveImg={() => setImgData(null)} imgData={imgData} />
    </section>
  );
}
