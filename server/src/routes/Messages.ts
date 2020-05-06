import { Router, Request, Response } from 'express';
import models from '../db/models';

const router = Router();

router.get('/messages/:matchId', async (req: Request, res: Response) => {
  const { matchId } = req.params;

  try {
    const messages = await models.messages.findAll({
      where: [{ matchId }],
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
