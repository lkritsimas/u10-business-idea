// import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import {
  IncomingForm, Part, Fields, Files,
} from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import { promisifyAll } from 'bluebird';
import * as config from '../../config/app.json';
import {
  isInvalidMimeType, resizeMultiple, cropImage, getImageMetadata, getExtensionFromMime,
} from './ImageProcessor';

const fs = promisifyAll(require('fs'));

export interface UploadResponse {
  format: string;
  fileName: string;
  filePath: string;
  processed: {
    cropped: {
      fileName: string;
      format: string;
      width: number;
      height: number;
      top: number;
      left: number;
      outPath: string;
    };
    resized:
      {
        format: string;
        width: number;
        height: number;
        outPath: string;
      }[];
  };
}

export default (req: Request, res: Response): Promise<UploadResponse> => {
  const form: IncomingForm = new IncomingForm();
  const uploadDir = path.join(__dirname, '../../upload');
  const { maxFileSize } = config.uploads;

  /* Config */
  form.maxFileSize = maxFileSize;
  form.uploadDir = uploadDir;

  // Emitted when there is an error processing the incoming form
  form.once('error', (err: any) => {
    if (!err) return;

    res.status(400).json({
      success: false,
      error: 'Unable to parse request',
    });
  });

  // Validate mime type before upload
  form.onPart = (part: Part): void => {
    if (part.filename === '' || !part.mime || isInvalidMimeType(part.mime)) {
      res.status(400).json({
        success: false,
        error: 'Filetype not allowed',
      });
    } else {
      form.handlePart(part);
    }
  };

  // Emitted when the entire request has been received,
  // and all contained files have finished flushing to disk
  form.once('end', () => {
    res.status(200).json({ success: true });
  });

  // Parse request
  const parsed = new Promise((resolve, reject) => {
    form.parse(req, async (err: any, fields: Fields, files: Files) => {
      const file = files.photo;
      if (!file) return;

      const newFileName = uuidv4(); // Generate UUIDv4
      const newFileFormat = config.uploads.saveFormat; // Get save format from config
      const newFileBasename = `${newFileName}.${newFileFormat}`;
      const newPath = path.join(uploadDir, newFileBasename);
      const originalFileExt = getExtensionFromMime(file.type);
      const originalFileBaseame = `original_${newFileName}.${originalFileExt}`;
      const originalPath = path.join(uploadDir, originalFileBaseame);

      try {
        // Rename file to 'original_<UUID>.<extension>'
        await fs.renameAsync(file.path, originalPath);

        // TODO: use metadata to verify crop ratio from server
        // const metadata = await getImageMetadata(originalPath);

        // Crop image (TODO: change to non-hardcoded test values)
        const cropOptions = {
          format: newFileFormat,
          width: 600,
          height: 800,
          top: 500,
          left: 500,
        };
        await cropImage(originalPath, cropOptions, newPath);

        // Create array of resize options
        const resizeList = config.uploads.resize.map(({ width, height }) => ({
          format: newFileFormat,
          width,
          height,
          outPath: path.join(
            uploadDir,
            `${width}x${height}_${newFileBasename}`,
          ),
        }));

        // Create thumbnails
        await Promise.all(
          resizeMultiple(newPath, resizeList),
        );

        resolve({
          format: originalFileExt,
          fileName: originalFileBaseame,
          filePath: originalPath,
          processed: {
            cropped: { fileName: newFileBasename, ...cropOptions, outPath: newPath },
            resized: resizeList,
          },
        });
      } catch (ex) {
        reject(ex);
        // Remove file
        await fs.unlinkAsync(file.path);
      }
    });
  });

  return parsed as Promise<UploadResponse>;
};
