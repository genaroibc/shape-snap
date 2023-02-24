import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import { useState } from 'react';
import { ImageData } from '../types';
import { PLATFORM_BANNER_SIZES } from '../constants/social-platforms';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

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

type TransformedImages = { id: string; platformName: string; avatar: string; banner: string | null };

type Props = {
  imageData: ImageData;
  platformList: string[];
};

export function TransformImage({ imageData, platformList }: Props) {
  const [transformedImages, setTransformedImages] = useState<TransformedImages[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleTransformImg = async (imageData: ImageData) => {
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
        // cldImg -> Cloudinary image
        const cldImage = cld.image(uploadedImgPublicID);

        const avatarDimensions = Resize.fill().width(150).height(150);
        const avatar = cldImage.resize(avatarDimensions).toURL();
        const platformId = uuid();

        const bannerWidth = PLATFORM_BANNER_SIZES[platformName]?.banner?.width;
        const bannerHeight = PLATFORM_BANNER_SIZES[platformName]?.banner?.height;

        const hasBanner = typeof bannerHeight === 'number' && typeof bannerWidth === 'number';
        if (!hasBanner) {
          return {
            avatar,
            platformName,
            banner: null,
            id: platformId
          };
        }

        const bannerDimensions = Resize.fill().width(bannerWidth).height(bannerHeight);
        const banner = cldImage.resize(bannerDimensions).toURL();

        return {
          avatar,
          banner,
          platformName,
          id: platformId
        };
      });

      setTransformedImages(transformedImages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full flex flex-col gap-4 p-4">
      {transformedImages && (
        <div className="flex flex-col gap-20 p-4">
          {transformedImages.map(({ avatar, banner, id, platformName }) => (
            <div
              key={id}
              className="flex flex-col justify-center items-center gap-4 p-4 text-center shadow-2xl rounded"
            >
              <h3 className="text-2xl text-blue-500">{platformName}</h3>
              {banner && (
                <>
                  <h5>Banner:</h5>
                  <img className="max-w-sm rounded" src={banner} alt="Nyan cat?" />
                </>
              )}
              <h5>Avatar:</h5>
              <img className="max-w-sm rounded-full" src={avatar} alt="Nyan cat?" />
            </div>
          ))}
        </div>
      )}

      <button className="max-w-fit mx-auto" onClick={() => handleTransformImg(imageData)}>
        Generate images
      </button>

      {uploadProgress && !transformedImages && <progress className="w-full" max={100} value={uploadProgress} />}
    </section>
  );
}
