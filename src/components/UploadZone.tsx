import { useEffect, useState } from 'react';
import { readImageFile } from '../utils/readImageFile';
import type { ImageData } from '../types';

type Props = {
  onUserImage: (imageData: ImageData) => void;
};

export function UploadZone({ onUserImage: onUserImage }: Props) {
  const [userImg, setUserImg] = useState<ImageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (userImg?.src && userImg.title) {
      onUserImage({ src: userImg?.src, title: userImg?.title });
    }
  }, [userImg]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
    setUserImg(null);

    const draggedData = event.dataTransfer;
    const imageFiles = draggedData.files;

    Array.from(imageFiles).forEach((imageFile) => {
      readImageFile(imageFile).then((result) => {
        if (!result.ok) return setError(result.error);

        setUserImg(result.data);
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
    <section className="p-4 flex gap-4 shadow-2xl">
      <section
        draggable
        onDrop={handleDrop}
        onDragEnter={(event) => handleToggleDragging({ event, isDragging: true })}
        onDragOver={(event) => handleToggleDragging({ event, isDragging: true })}
        onDragLeave={(event) => handleToggleDragging({ event, isDragging: false })}
        className={`grid place-content-center w-80 h-80 max-w-xl my-4
          mx-auto border-black border-dashed border-4 rounded-3xl
          transition-scale duration-200
          ${isDragging ? 'bg-green-500 scale-125' : 'bg-transparent'}`}
      >
        <p>upload your image here</p>
      </section>

      <div className="max-w-xs w-full mx-auto text-center flex flex-col gap-4">
        {error ? (
          <p>{error}</p>
        ) : (
          userImg?.src && (
            <>
              <img className="border-green-500 border-4 rounded-md" src={userImg.src} alt={userImg.title} />
              <h6>{userImg.title}</h6>
            </>
          )
        )}
      </div>
    </section>
  );
}
