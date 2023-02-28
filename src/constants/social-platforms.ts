import { PlatformBanners, PlatformItem, PlatformName } from '../types';

const _PLATFORM_ICON_URLS: Record<PlatformName, string> = {
  twitch: '/assets/svg/brands/twitch.svg',
  youtube: '/assets/svg/brands/youtube.svg',
  twitter: '/assets/svg/brands/twitter.svg',
  pinterest: '/assets/svg/brands/pinterest.svg',
  linkedin: '/assets/svg/brands/linkedin.svg'
};

export const PLATFORM_ITEMS: PlatformItem[] = (
  Object.entries(_PLATFORM_ICON_URLS) as Array<[PlatformName, string]>
).map(([name, iconSrc]) => ({ iconSrc, name }));

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
  youtube: {
    banners: [
      { name: 'television', width: 2560, height: 1440 },
      { name: 'desktop', width: 1440, height: 280 },
      { name: 'all devices', width: 850, height: 280 }
    ]
  },
  twitch: {
    banners: [
      {
        width: 1150,
        height: 445,
        name: 'all devices'
      }
    ]
  },
  pinterest: {
    banners: [
      {
        width: 894,
        height: 505,
        name: 'all devices'
      },
      {
        width: 505,
        height: 505,
        name: 'mobile'
      }
    ]
  },
  linkedin: {
    banners: [
      {
        height: 278,
        name: 'all devices',
        width: 1115
      }
    ]
  }
};
