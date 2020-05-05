import { Router } from 'express';
import Test from './Test';

const router = Router();

router.get('/test', Test);

export default router;
