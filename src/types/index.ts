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

export type PlatformBanners = Record<string, { banners: { name: string; width: number; height: number }[] | null }>;
