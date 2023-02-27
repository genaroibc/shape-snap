import { PlatformBanners, PlatformItem } from '../types';

export const PLATFORM_LIST: PlatformItem[] = [
  { name: 'twitch', iconSrc: '/assets/svg/brands/twitch.svg' },
  { name: 'youtube', iconSrc: '/assets/svg/brands/youtube.svg' },
  { name: 'twitter', iconSrc: '/assets/svg/brands/twitter.svg' },
  { name: 'pinterest', iconSrc: '/assets/svg/brands/pinterest.svg' },
  { name: 'linkedin', iconSrc: '/assets/svg/brands/linkedin.svg' }
];

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
