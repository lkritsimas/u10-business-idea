import { Router } from 'express';
import Test from './Test';
import Profile from './Profile';
import Matches from './Matches';
import Discover from './Discover';
import Messages from './Messages';

const router = Router();

router.get('/test', Test);
router.get('/profile', Profile);
router.get('/matches', Matches);
router.get('/messages/:toUserId', Messages);
router.get('/discover', Discover);

export default router;
