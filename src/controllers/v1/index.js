import { Router } from 'express';
import registerRouter from './register';
import loginRouter from './login';
import tokenRouter from './token';

const router = Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(tokenRouter);

export default router;
