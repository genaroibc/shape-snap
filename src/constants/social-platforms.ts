import { PlatformBanners } from '../types';

export const PLATFORM_BANNER_SIZES: PlatformBanners = {
  twitter: {
    banners: [
      {
        name: 'all devices',
        width: 1080,
        height: 360
      }
    ]
  },
  instagram: {
    banners: null
  },
  tiktok: {
    banners: null
  },
  twitch: {
    banners: null
  },
  github: {
    banners: null
  },
  youtube: {
    banners: [
      { name: 'television', width: 2560, height: 1440 },
      { name: 'desktop', width: 1440, height: 280 },
      { name: 'all devices', width: 850, height: 280 }
    ]
  }
};
