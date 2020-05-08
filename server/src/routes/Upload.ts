import { Router, Request, Response } from 'express';
import uploadHandler, { UploadResponse } from '../helpers/UploadHandler';
// import models from '../db/models';

const router = Router();

router.post('/upload', async (req: Request, res: Response) => {
  const photo: UploadResponse = await uploadHandler(req, res);
  // TODO: Store photo in database
});

export default router;
