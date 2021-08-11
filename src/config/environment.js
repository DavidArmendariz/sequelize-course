export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    '03afc0820d376f9fdb1e8faa460902c6f74705feb01f101c480f4205964e3e10',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    '7bfd6e6512e8ac8b56e31cfbdbe767892a87075039d4a524b2b2ddcb2fb2c69f',
};
