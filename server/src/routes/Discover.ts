import { Router, Request, Response } from 'express';
import Sequelize, { Op } from 'sequelize';
import models from '../db/models';

const router = Router();

router.get('/discover', async (req: Request, res: Response) => {
  try {
    const user = await models.users.findOne();

    const users = await models.users.findAll({
      where: {
        discoverable: true, // Skip undiscoverable users
        [Op.not]: [
          { id: user.id }, // Skip self
        ],
        // TODO: Skip already matched users
      },
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
      // include: [
      //   {
      //     model: models.matches.scope(null), // Prevent the default scope from adding attributes
      //     as: 'matches',
      //     where: {
      //       [Op.or]: [
      //         { userId1: user.id },
      //         { userId2: user.id },
      //       ],
      //     },
      //     required: true, // Force an inner join
      //     attributes: ['userId1', 'userId2'], // Join without selecting any attributes
      //   },
      // ],
      limit: 100,
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
