import { Router } from 'express';
import registerRouter from './register';
import loginRouter from './login';

const router = Router();

router.use(registerRouter);
router.use(loginRouter);

export default router;
