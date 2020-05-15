import { Router, Request, Response } from 'express';
import UploadController, { UploadResponse } from '../controllers/UploadController';
// import models from '../db/models';

const router = Router();

router.post('/upload', async (req: Request, res: Response) => {
  try {
    const photo: UploadResponse = await UploadController(req, res);
    // console.log(photo);
    res.status(201).json({ success: true });

    // TODO: Store photo in database
  } catch (ex) {
    console.log(ex);
  }
});

export default router;
