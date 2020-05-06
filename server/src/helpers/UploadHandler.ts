import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import * as config from '../../config/app.json';

export const isInvalidMimeType = (mime: string) => {
  const { mimeTypes } = config.uploads;
  return !mimeTypes.includes(mime.toLowerCase());
};

export default (req: Request, res: Response) => {
  const form: IncomingForm = new IncomingForm();
  const uploadDir = path.join(__dirname, '../upload');
  const { maxFileSize } = config.uploads;
  // Config
  form.maxFileSize = maxFileSize;
  form.uploadDir = uploadDir;

  form.once('error', console.error);

  // Validate mime type before upload
  form.onPart = (part) => {
    if (part.filename === '' || !part.mime || isInvalidMimeType(part.mime)) {
      res.status(400).json({
        error: 'Filetype not allowed',
      });
    }
  };

  form.on('file', (err, field, file) => {
    console.log('file');
    console.log(file);
    console.log(field);
    console.log(file.toJSON());
  });

  form.once('end', () => {
    console.log('end');
    res.json();
  });

  // Parse request
  form.parse(req);
};
