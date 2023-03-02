import { useState } from 'react';
import { ImageData, PlatformName, TransformedImages } from '../types';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { PlatformCards } from './PlatformCards';
import { uploadImage } from '../services/upload-image';
import { mapImageToBanners } from '../utils/mapImageToBanners';

type Props = {
  imageData: ImageData;
  platformList: PlatformName[];
};

export function TransformImage({ imageData, platformList }: Props) {
  const [transformedImages, setTransformedImages] = useState<TransformedImages[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    const bannersData = transformedImages.map(({ banners, platformName }) => ({
      url: banners[0].url,
      name: platformName
    }));

    const zip = new JSZip();

    await new Promise((resolve) => {
      const filePromises = bannersData.map(async (platformBanner) => {
        const imageResponse = await fetch(platformBanner.url);
        const imageBlob = await imageResponse.blob();

        const fileName = `${platformBanner.name}-banner.jpeg`;
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

      {uploadProgress && !transformedImages && <progress className="w-full" max={100} value={uploadProgress} />}

      {transformedImages && <button onClick={handleDownloadZIPFile}>Download generated banners</button>}
    </section>
  );
}
