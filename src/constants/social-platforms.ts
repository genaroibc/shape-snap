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

export const PLATFORM_BANNERS: PlatformBanners = {
  twitter: {
    width: 1080,
    height: 360
  },
  youtube: {
    width: 1440,
    height: 280
  },
  // { name: 'cll devices', width: 850, height: 280 }
  twitch: {
    width: 1150,
    height: 445
  },
  pinterest: {
    width: 894,
    height: 505
  },
  linkedin: {
    height: 278,
    width: 1115
  }
};
