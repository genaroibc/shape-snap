import { ImageData } from '../types';

type Props = {
  error: string | null;
  imgData: ImageData | null;
  handleRemoveImg: () => void;
};

export function UploadedImage({ error, imgData, handleRemoveImg }: Props) {
  return (
    <div className="max-w-md mx-auto text-center flex flex-col justify-center gap-4">
      {error ? (
        <p>{error}</p>
      ) : imgData === null ? (
        <p>Your image goes here</p>
      ) : (
        <figure className="relative">
          <button
            title="remove image"
            aria-label="remove image"
            onClick={handleRemoveImg}
            className="removeImgBtn absolute rounded-md top-0 right-0 p-2 m-0 bg-red-500 z-10 hover:bg-red-600 hover:grayscale-70"
          >
            <img className="w-4" src="/assets/svg/close.svg" alt="remove file" />
          </button>
          <img className="rounded-md w-full" src={imgData.src} title={imgData.title} alt={imgData.title} />
        </figure>
      )}
    </div>
  );
}
