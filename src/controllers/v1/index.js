import { Router } from 'express';
import registerRouter from './register';
import loginRouter from './login';
import tokenRouter from './token';
import logoutRouter from './logout';

const router = Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(tokenRouter);
router.use(logoutRouter);

export default router;
