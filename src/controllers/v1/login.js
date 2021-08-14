import { Router } from 'express';
import models from '../../models';
import asyncWrapper from '../../utils/asyncWrapper';
import JWTUtils from '../../utils/jwt-utils';

const router = Router();
const { User } = models;

router.post(
  '/login',
  asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user || !(await user.comparePasswords(password))) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid credentials' });
    }

    const payload = { email };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const savedRefreshToken = await user.getRefreshToken();
    let refreshToken;

    if (!savedRefreshToken || !savedRefreshToken.token) {
      refreshToken = JWTUtils.generateRefreshToken(payload);

      if (!savedRefreshToken) {
        await user.createRefreshToken({ token: refreshToken });
      } else {
        savedRefreshToken.token = refreshToken;
        await savedRefreshToken.save();
      }
    } else {
      refreshToken = savedRefreshToken.token;
    }

    return res.status(200).send({
      success: true,
      message: 'Successfully logged in',
      data: {
        accessToken,
        refreshToken,
      },
    });
  })
);

export default router;
