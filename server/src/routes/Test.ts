import { Router, Request, Response } from 'express';
import models from '../db/models';

const router = Router();

router.get('/test', async (req: Request, res: Response) => {
  try {
    // const users = await models.users.findAll({
    //   include: [
    //     {
    //       model: models.profiles,
    //       as: 'matches',
    //       include: [
    //         models.messages,
    //       ],
    //     },
    //     // { model: models.matches },
    //     // { model: models.messages },
    //   ],
    // });
    const test = await models.profiles.findAll({
      include: [
        { model: models.users },
        { model: models.messages },
        // { model: models.matches },
      ],
    });


    return res.status(200).json(test);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
