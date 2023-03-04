import { Resize } from '@cloudinary/url-gen/actions';
import { PLATFORM_BANNERS } from '../constants/social-platforms';
import { v4 as uuid } from 'uuid';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { faces } from '@cloudinary/url-gen/qualifiers/focusOn';
import { Cloudinary } from '@cloudinary/url-gen';
import { PlatformName, TransformedImage } from '../types';

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

export function mapImageToBanners({ imagePublicID, platformList, containsFaces }: Params): TransformedImage[] {
  const transformedImages: TransformedImage[] = platformList.map((platformName) => {
    const platformId = uuid();
    const { height, width } = PLATFORM_BANNERS[platformName];
    const uploadedImg = cld.image(imagePublicID);

    const initialTransformation = Resize.fill().width(width).height(height);

    const url = containsFaces
      ? uploadedImg.resize(initialTransformation.gravity(focusOn(faces()))).toURL()
      : uploadedImg.resize(initialTransformation).toURL();

    return {
      banner: {
        height,
        id: uuid(),
        url,
        width
      },
      platformName,
      id: platformId
    };
  });

  return transformedImages;
}
