export interface KnownError {
  ok: false;
  error: string;
}

export interface KnownResult<T> {
  ok: true;
  data: T;
}

export type ImageData = { src: string; title: string };

export type PlatformBannerSize = {
  width: number;
  height: number;
};

export type PlatformItemName = 'twitch' | 'twitter' | 'youtube' | 'pinterest' | 'linkedin';
export type PlatformItem = { name: PlatformItemName; iconSrc: string };
export type PlatformBanners = Record<PlatformItemName, { banners: { name: string; width: number; height: number }[] }>;
