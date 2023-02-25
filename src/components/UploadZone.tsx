import { useEffect, useState } from 'react';
import { readImageFile } from '../utils/readImageFile';
import type { ImageData } from '../types';

type Props = {
  onNewImgData: (imageData: ImageData) => void;
  defaultImgData: ImageData | null;
};

export function UploadZone({ defaultImgData, onNewImgData }: Props) {
  const [imgData, setImgData] = useState<ImageData | null>(defaultImgData);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (imgData?.src && imgData.title) {
      onNewImgData({ src: imgData?.src, title: imgData?.title });
    }
  }, [imgData]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const draggedData = event.dataTransfer;
    const imageFiles = draggedData.files;

    handleReadImgFiles(imageFiles);
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target as HTMLInputElement;
    const imageFiles = inputFile?.files;

    if (!imageFiles) return setError('No images found, please try again');

    handleReadImgFiles(imageFiles);
  };

  const handleReadImgFiles = (imageFiles: FileList) => {
    if (!imageFiles.length) return setError('No images found, please try again');

    Array.from(imageFiles).forEach((imgFile) => {
      readImageFile(imgFile).then((result) => {
        if (!result.ok) return setError(result.error);

        setImgData(result.data);
      });
    });
  };

  type HandleToggleDraggingProps = { event: React.DragEvent; isDragging: boolean };
  const handleToggleDragging = ({ event, isDragging }: HandleToggleDraggingProps) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(isDragging);
  };

  return (
    <section className="p-12 flex items-center gap-4 shadow-2xl">
      <label htmlFor="browse-files">
        <section
          draggable
          onDrop={handleDrop}
          onDragEnter={(event) => handleToggleDragging({ event, isDragging: true })}
          onDragOver={(event) => handleToggleDragging({ event, isDragging: true })}
          onDragLeave={(event) => handleToggleDragging({ event, isDragging: false })}
          className={`grid hover:cursor-pointer place-content-center gap-2 text-center w-80 h-80 max-w-xl mx-auto border-black border-dashed border-4 rounded-3xl transition-scale duration-200 ${
            isDragging ? 'scale-125' : 'bg-transparent'
          }`}
        >
          <img src="/public/assets/svg/upload-image.svg" alt="Upload your images here" />
          <input hidden name="browse-files" id="browse-files" type="file" onChange={handleInputFileChange} />
        </section>
      </label>

      <div className="max-w-xs w-full mx-auto text-center flex flex-col justify-center gap-4">
        {error ? (
          <p>{error}</p>
        ) : (
          imgData?.src && (
            <>
              <img className="border-4 rounded-md" src={imgData.src} alt={imgData.title} />
              <h6>{imgData.title}</h6>
            </>
          )
        )}
      </div>
    </section>
  );
}
