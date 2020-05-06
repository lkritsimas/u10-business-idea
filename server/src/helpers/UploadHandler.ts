import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import * as config from '../../config/app.json';

export const isInvalidMimeType = (mime: string): boolean => {
  const { mimeTypes } = config.uploads;
  return !mimeTypes.includes(mime.toLowerCase());
};

export default (req: Request, res: Response) => {
  const form: IncomingForm = new IncomingForm();
  const uploadDir = path.join(__dirname, '../../upload');
  const { maxFileSize } = config.uploads;

  /* Config */
  form.maxFileSize = maxFileSize;
  form.uploadDir = uploadDir;

  // Emitted when there is an error processing the incoming form
  form.once('error', (err) => {
    if (!err) return;

    console.error('err', err);
    res.status(400).json({
      error: 'Unable to parse request',
    });
  });

  // Validate mime type before upload
  form.onPart = (part) => {
    if (part.filename === '' || !part.mime || isInvalidMimeType(part.mime)) {
      res.status(400).json({
        error: 'Filetype not allowed',
      });
    } else {
      form.handlePart(part);
    }
  };

  // Emitted whenever a field / file pair has been received
  form.on('file', (field, file) => {
    if (!file) return;

    try {
      // Rename file
      const fileName = `${uuidv4()}.jpg`;
      fs.rename(file.path, path.join(uploadDir, fileName), (err) => {
        if (!err) return;
        console.error(err);
      });
    } catch (ex) {
      console.error(ex);
      // Remove file
      fs.unlink(file.path, (err) => {
        if (!err) return;
        console.error(err);
      });
    }
  });

  // Emitted when the entire request has been received,
  // and all contained files have finished flushing to disk
  form.once('end', () => {
    console.log('end');
    res.status(200).json({
      success: true,
    });
  });

  // Parse request
  form.parse(req);
};
