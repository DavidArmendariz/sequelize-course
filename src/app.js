import express from 'express';
import environment from './config/environment';
import logger from 'morgan';

export default class App {
  constructor() {
    this.app = express();
    this.app.use(
      logger('dev', { skip: (req, res) => environment.nodeEnv === 'test' })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setRoutes();
  }

  setRoutes() {}

  getApp() {
    return this.app;
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  }
}
