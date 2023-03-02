import axios from 'axios';
import { ImageData, KnownResponse } from '../types';

type Params = {
  imageData: ImageData;
  onProgress: (progress: number) => void;
};

export async function uploadImage({
  imageData,
  onProgress
}: Params): Promise<KnownResponse<{ imagePublicID: string }>> {
  const API_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_API_URL;
  if (!API_URL) throw new Error("'VITE_CLOUDINARY_UPLOAD_API_URL' env variable is not defined");

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!CLOUD_NAME) throw new Error("'VITE_CLOUDINARY_CLOUD_NAME' env variable is not defined");

  const data = new FormData();
  data.append('file', imageData.src);
  data.append('upload_preset', CLOUD_NAME);

  try {
    const response = await axios.post(API_URL, data, {
      onUploadProgress: (event) => {
        const progress = (event.loaded / (event.total ?? 0)) * 100;
        onProgress(progress);
      }
    });

    const uploadedImgPublicID = response?.data?.public_id;

    if (typeof uploadedImgPublicID !== 'string') {
      return { ok: false, error: 'There was an error uploading your image, please try again' };
    }

    return { ok: true, data: { imagePublicID: uploadedImgPublicID } };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'There was an error uploading your image, please try again' };
  }
}
