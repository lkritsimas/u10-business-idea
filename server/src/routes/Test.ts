import { Router, Request, Response } from 'express';
import models from '../db/models';

const router = Router();

router.get('/test', async (req: Request, res: Response) => {
  try {
    const users = await models.Users.findAll({
      include: [
        { model: models.Swipes },
        { model: models.Matches },
        { model: models.Messages },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
