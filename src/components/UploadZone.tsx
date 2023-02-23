import { useState } from 'react';

export function UploadZone() {
  const [uploadedImg, setUploadedImg] = useState<{ src: string; title: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleReadFiles = (file: File) => {
    if (file.type.split('/')[0] !== 'image') {
      return setError('Please upload an image file.\nSupported formats: png, jpg, jpeg, webp, gif, and svg');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = () => setError('There was an error reading your file, please try again.');

    reader.onload = () => {
      setError(null);

      const imgUrl = reader.result;

      if (typeof imgUrl === 'string') {
        setUploadedImg({ src: imgUrl, title: file.name });
        return;
      }

      if (imgUrl instanceof ArrayBuffer) {
        setUploadedImg({ src: URL.createObjectURL(new Blob([imgUrl])), title: file.name });
        return;
      }

      setError('There was an error uploading the image, please try again.');
    };
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const draggedData = event.dataTransfer;
    const files = draggedData.files;
    // imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      handleReadFiles(file);
    });
  };

  type HandleToggleDraggingProps = { event: React.DragEvent; isDragging: boolean };
  const handleToggleDragging = ({ event, isDragging }: HandleToggleDraggingProps) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(isDragging);
  };

  return (
    <form className="my-8 p-4 flex flex-col gap-4" action="https://api.cloudinary.com/v1_1/duqlgh2vs">
      <section
        draggable
        onDrop={handleDrop}
        onDragEnter={(event) => handleToggleDragging({ event, isDragging: false })}
        onDragOver={(event) => handleToggleDragging({ event, isDragging: false })}
        onDragLeave={(event) => handleToggleDragging({ event, isDragging: true })}
        className={`grid place-content-center w-80 h-80 max-w-xl my-4
          mx-auto bg-secondary border-black border-dashed border-4 rounded-3xl
          transition-scale duration-200
          ${isDragging ? 'bg-green-500 scale-125' : 'bg-blue-500'}`}
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
          uploadedImg?.src && (
            <>
              <img className="border-green-500 border-4 rounded-md" src={uploadedImg.src} alt={uploadedImg.title} />
              <h6>{uploadedImg.title}</h6>
            </>
          )
        )}
      </div>
    </form>
  );
}
