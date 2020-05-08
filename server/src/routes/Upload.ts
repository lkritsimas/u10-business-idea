import { Router, Request, Response } from 'express';
import uploadHandler, { UploadResponse } from '../helpers/UploadHandler';
// import models from '../db/models';

const router = Router();

router.post('/upload', async (req: Request, res: Response) => {
  try {
    const photo: UploadResponse = await uploadHandler(req, res);
    console.log(photo);
    // TODO: Store photo in database
  } catch (ex) {
    console.log(ex);
  }
});

export default router;
