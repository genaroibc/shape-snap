import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import { useState } from 'react';
import { ImageData, PlatformName, TransformedImages } from '../types';
import { PLATFORM_BANNER_SIZES } from '../constants/social-platforms';
import { v4 as uuid } from 'uuid';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import axios from 'axios';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { faces } from '@cloudinary/url-gen/qualifiers/focusOn';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
if (!CLOUD_NAME) throw new Error("'VITE_CLOUDINARY_CLOUD_NAME' env variable is not defined");

const cld = new Cloudinary({
  cloud: {
    cloudName: 'shape-snap'
  },
  url: {
    secure: true
  }
});

type Props = {
  imageData: ImageData;
  platformList: PlatformName[];
};

export function TransformImage({ imageData, platformList }: Props) {
  const [transformedImages, setTransformedImages] = useState<TransformedImages[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const containsFaces = formElement['containsFaces'].checked;

    handleTransformImg({ containsFaces, imageData });
  };

  type HandleTansformImgProps = {
    containsFaces: boolean;
    imageData: ImageData;
  };
  const handleTransformImg = async ({ containsFaces, imageData }: HandleTansformImgProps) => {
    const API_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_API_URL;

    if (!API_URL) {
      throw new Error("'VITE_CLOUDINARY_UPLOAD_API_URL' env variable is not defined");
    }

    const data = new FormData();
    data.append('file', imageData.src);
    data.append('upload_preset', 'shape-snap');

    try {
      const response = await axios.post(API_URL, data, {
        onUploadProgress: (event) => {
          const progress = (event.loaded / (event.total ?? 0)) * 100;
          setUploadProgress(progress);
        }
      });

      const uploadedImgPublicID = response?.data?.public_id;

      const transformedImages: TransformedImages[] = platformList.map((platformName) => {
        const platformId = uuid();
        const platformBanners = PLATFORM_BANNER_SIZES[platformName].banners;
        const uploadedImg = cld.image(uploadedImgPublicID);

        const banners = platformBanners.map(({ name, width, height }) => {
          const initialTransformation = Resize.fill().width(width).height(height);

          const url = containsFaces
            ? uploadedImg.resize(initialTransformation.gravity(focusOn(faces()))).toURL()
            : uploadedImg.resize(initialTransformation).toURL();

          return {
            name,
            url,
            width,
            height,
            id: uuid()
          };
        });

        return {
          banners,
          platformName,
          id: platformId
        };
      });

      setTransformedImages(transformedImages);
    } catch (error) {
      console.error(error);
    }
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
    <section className="w-full flex flex-col gap-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 justify-center items-center">
        <img className="max-w-lg" src={imageData.src} alt={imageData.title} />

        <div className="text-xl">
          <label htmlFor="containsFaces">Contains faces</label>
          <input className="mx-4" type="checkbox" id="containsFaces" name="containsFaces" />
        </div>

        <button className="max-w-fit mx-auto">Generate images</button>
      </form>

      {transformedImages && (
        <div className="flex flex-col gap-20 p-4">
          {transformedImages.map(({ banners, id, platformName }) => (
            <div
              key={id}
              className="flex flex-col justify-center items-center gap-12 p-4 text-center shadow-2xl rounded"
            >
              <h3 className="text-2xl text-blue-500">{platformName}</h3>

              {banners.map(({ name, url, id, height, width }) => (
                <figure key={id} className="flex flex-col gap-4 bg-white p-4 shadow-xl rounded">
                  <h5 className="text-xl">{name.toUpperCase()}</h5>
                  <img
                    className="object-cover max-w-xl rounded"
                    src={url}
                    alt={`${platformName} banner in ${name} resolution`}
                    title={`${platformName} banner in ${name} resolution`}
                  />
                  <figcaption className="text-gray-700">
                    {width}x{height}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      )}

      {uploadProgress && !transformedImages && <progress className="w-full" max={100} value={uploadProgress} />}

      {transformedImages && <button onClick={handleDownloadZIPFile}>Download generated banners</button>}
    </section>
  );
}
