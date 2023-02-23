import { useState } from 'react';
import { readImageFile } from '../utils/readImageFile';
import axios from 'axios';

export function UploadZone() {
  const [userImg, setUserImg] = useState<{ src: string; title: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transformedImgUrl, setTransformedImgUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const uploadImageFile = async (imageData: File) => {
    const API_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_API_URL;

    if (!API_URL) {
      throw new Error("'VITE_CLOUDINARY_UPLOAD_API_URL' env variable is not defined");
    }

    const data = new FormData();

    data.append('file', imageData);
    data.append('upload_preset', 'shape-snap'); // set up your upload_preset on cloudinary.

    try {
      const res = await axios.post(API_URL, data, {
        onUploadProgress: (event) => {
          console.log((event.loaded / (event.total ?? 0)) * 100);
        }
      });
      setTransformedImgUrl(res.data.secure_url);
      return res.data.secure_url;
    } catch (error) {
      return console.error(error);
    }
  };

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
        uploadImageFile(imageFile);
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
    <section className="p-4 flex flex-col gap-4 shadow-2xl">
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
        <img src="/assets/svg/drop.svg" alt="drop here" />
      </section>

      <button className="w-fit m-auto" type="submit">
        Upload
      </button>

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
        {transformedImgUrl && (
          <img className="border-green-500 border-4 rounded-md" src={transformedImgUrl} alt={'a cat'} />
        )}{' '}
      </div>
    </section>
  );
}
