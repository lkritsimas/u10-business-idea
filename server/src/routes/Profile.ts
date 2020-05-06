import { Router, Request, Response } from 'express';
import models from '../db/models';

const router = Router();

router.get('/profile', async (req: Request, res: Response) => {
  try {
    const user = await models.users.findOne();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
