import { Resize } from '@cloudinary/url-gen/actions';
import { PLATFORM_BANNER_SIZES } from '../constants/social-platforms';
import { v4 as uuid } from 'uuid';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { faces } from '@cloudinary/url-gen/qualifiers/focusOn';
import { Cloudinary } from '@cloudinary/url-gen';
import { PlatformName, TransformedImages } from '../types';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
if (!CLOUD_NAME) throw new Error("'VITE_CLOUDINARY_CLOUD_NAME' env variable is not defined");

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME
  },
  url: {
    secure: true
  }
});

type Params = {
  containsFaces: boolean;
  imagePublicID: string;
  platformList: PlatformName[];
};

export function mapImageToBanners({ imagePublicID, platformList, containsFaces }: Params): TransformedImages[] {
  const transformedImages: TransformedImages[] = platformList.map((platformName) => {
    const platformId = uuid();
    const platformBanners = PLATFORM_BANNER_SIZES[platformName].banners;
    const uploadedImg = cld.image(imagePublicID);

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

  return transformedImages;
}
