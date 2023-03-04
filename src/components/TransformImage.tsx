import { useEffect, useState } from 'react';
import { ImageData, PlatformName, TransformedImage } from '../types';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { PlatformCards } from './PlatformCards';
import { uploadImage } from '../services/upload-image';
import { mapImageToBanners } from '../utils/mapImageToBanners';

type Props = {
  imageData: ImageData;
  platformList: PlatformName[];
  onNewTransformedImages: (images: TransformedImage[] | null) => void;
  initialTransformedImages: TransformedImage[] | null;
};

export function TransformImage({ imageData, platformList, onNewTransformedImages, initialTransformedImages }: Props) {
  const [transformedImages, setTransformedImages] = useState<TransformedImage[] | null>(initialTransformedImages);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onNewTransformedImages(transformedImages);
  }, [transformedImages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const containsFaces = formElement['containsFaces'].checked;

    handleTransformImg({ containsFaces, imageData });
  };

  type HandleTransformImgProps = {
    containsFaces: boolean;
    imageData: ImageData;
  };
  const handleTransformImg = async ({ containsFaces, imageData }: HandleTransformImgProps) => {
    const response = await uploadImage({
      imageData,
      onProgress: (progress) => setUploadProgress(progress)
    });

    if (!response.ok) return setError(response.error);

    const { imagePublicID } = response.data;

    const transformedImages = mapImageToBanners({ imagePublicID, containsFaces, platformList });

    setTransformedImages(transformedImages);
  };

  const handleDownloadZIPFile = async () => {
    if (!transformedImages) return;

    const bannersData = transformedImages.map(({ banner, platformName }) => ({
      url: banner.url,
      name: platformName
    }));

    const zip = new JSZip();

    await new Promise((resolve) => {
      const filePromises = bannersData.map(async (platformBanner) => {
        const imageResponse = await fetch(platformBanner.url);
        const imageBlob = await imageResponse.blob();

        const imageExtension = imageBlob.type.split('/')[1];
        const fileName = `${platformBanner.name}-banner.${imageExtension}`;

        zip.file(fileName, imageBlob, { binary: true });
      });

      Promise.allSettled(filePromises).then(() => resolve(null));
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const zipFileName = 'shape-snap-banners.zip';
      saveAs(content, zipFileName);
    });
  };

  return (
    <section className="w-full flex flex-col gap-4 md:p-4">
      <form onSubmit={handleSubmit} className="flex max-w-lg mx-auto flex-col gap-4 md:p-4 justify-center items-center">
        <img src={imageData.src} alt={imageData.title} />

        <div className="text-xl">
          <label htmlFor="containsFaces">Contains faces</label>
          <input className="mx-4" type="checkbox" id="containsFaces" name="containsFaces" />
        </div>

        <button className="max-w-fit mx-auto">Generate images</button>
      </form>

      {transformedImages && <PlatformCards cards={transformedImages} />}

      {error && <p>{error}</p>}

      {uploadProgress && !transformedImages && (
        <progress className="w-full max-w-sm bg-red-500 p-4" max={100} value={uploadProgress} />
      )}

      {transformedImages && (
        <button className="max-w-fit flex gap-2 items-center justify-center mx-auto" onClick={handleDownloadZIPFile}>
          Download banners
          <svg className="w-8 max-w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{' '}
            </g>
          </svg>
        </button>
      )}
    </section>
  );
}
