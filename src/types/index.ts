export interface KnownError {
  ok: false;
  error: string;
}

export interface KnownResult<T> {
  ok: true;
  data: T;
}

export type KnownResponse<T> = KnownResult<T> | KnownError;

export type ImageData = { src: string; title: string };

export type PlatformBannerSize = {
  width: number;
  height: number;
};

export type PlatformItem = { name: PlatformName; iconSrc: string };
export type PlatformBanners = Record<PlatformName, { banners: Array<{ name: string; width: number; height: number }> }>;

// to generate dynamic types, making easier adding or removing a platform
// only needing to modify this object
const _PLATFORM_NAMES_DICTIONARY = {
  twitch: null,
  twitter: null,
  youtube: null,
  pinterest: null,
  linkedin: null
};

export const PLATFORM_LIST = Object.keys(_PLATFORM_NAMES_DICTIONARY);
export type PlatformName = keyof typeof _PLATFORM_NAMES_DICTIONARY;

export function isPlatformName(data: unknown): data is PlatformName {
  return typeof data === 'string' && Object.keys(_PLATFORM_NAMES_DICTIONARY).includes(data);
}

export type TransformedImageBanner = { name: string; url: string; id: string; width: number; height: number };

export type TransformedImages = {
  id: string;
  platformName: string;
  banners: TransformedImageBanner[];
};
