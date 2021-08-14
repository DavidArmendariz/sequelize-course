import { Router } from 'express';
import registerRouter from './register';

const router = Router();

router.use(registerRouter);

export default router;
