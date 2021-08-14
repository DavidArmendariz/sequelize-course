import { Router } from 'express';
import models from '../../models';
import asyncWrapper from '../../utils/asyncWrapper';
import JWTUtils from '../../utils/jwt-utils';

const router = Router();
const { User } = models;

router.post(
  '/register',
  asyncWrapper(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res
        .status(200)
        .send({ success: false, message: 'User already exists' });
    }

    const payload = { email };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const refreshToken = JWTUtils.generateRefreshToken(payload);
    await User.createNewUser({ ...req.body, refreshToken });

    return res.status(200).send({
      success: true,
      message: 'User successfully registered',
      data: {
        accessToken,
        refreshToken,
      },
    });
  })
);

export default router;
