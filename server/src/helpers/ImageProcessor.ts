import sharp, { Metadata, Sharp } from 'sharp';
import * as config from '../../config/app.json';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ResizeImageOptions extends ImageDimensions {
  format?: string;
  outPath: string;
}

export interface CropImageOptions extends ImageDimensions {
  format?: string;
  left: number;
  top: number;
  originalHeight?: number;
  originalWidth?: number;
}

// Get metadata from image
export const getImageMetadata = async (file: string): Promise<Metadata> => sharp(file).metadata();

// Crop image
export const cropImage = async (
  file: string | Buffer,
  options: CropImageOptions,
  outPath: string,
): Promise<Sharp> => {
  const {
    width, height, format, left, top,
  } = options;
  return new Promise((resolve, reject) => {
    const image = sharp(file)
      .extract({
        top,
        left,
        width,
        height,
      });

    if (format) {
      image.toFormat(format);
    }

    image.toFile(outPath, (err: Error) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// Resize one image to multiple sizes
export const resizeMultiple = (
  file: string | Buffer,
  options: ResizeImageOptions[],
): Promise<Sharp>[] => {
  const images: Promise<Sharp>[] = [];

  options.forEach(({
    width, height, format, outPath,
  }) => {
    images.push(new Promise((resolve, reject) => {
      const image = sharp(file)
        .resize(width, height);

      if (format) {
        image.toFormat(format);
      }

      image.toFile(outPath, (err: Error) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    }));
  });

  return images;
};

// Check if MIME type is allowed in config
export const isInvalidMimeType = (mime: string): boolean => {
  const { allowedMimeTypes } = config.uploads;
  return !allowedMimeTypes.includes(mime.toLowerCase());
};

// Get file extension from MIME type
export const getExtensionFromMime = (mime: string): string | null => {
  switch (mime) {
    case 'image/jpg':
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return null;
  }
};
