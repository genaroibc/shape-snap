/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string | undefined;
  readonly VITE_CLOUDINARY_ASSETS_URL: string | undefined;
  readonly VITE_CLOUDINARY_UPLOAD_API_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
