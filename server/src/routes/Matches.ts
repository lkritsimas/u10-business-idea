import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import models from '../db/models';

const router = Router();

router.get('/matches', async (req: Request, res: Response) => {
  try {
    const user = await models.users.findOne();
    const matches = await models.matches.findAll({
      where: {
        [Op.or]: [
          { userId1: user.id },
          { userId2: user.id },
        ],
      },
      include: [
        {
          separate: true,
          model: models.messages,
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
        {
          model: models.users,
          attributes: [
            'id',
            'githubUsername',
            'name',
            'gender',
            'age',
            'bio',
            'occupation',
            'education',
            'photo1',
            'photo2',
            'photo3',
            'photo4',
            'photo5',
            'photo6',
          ],
        },
      ],
    });

    return res.status(200).json(matches);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
