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

export type PlatformImage = Record<string, { banner: PlatformBannerSize | null }>;
