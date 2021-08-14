import '../src/config';
import Database from '../src/database';
import dbConfig from '../src/config/database';
import request from 'supertest';

let db;

export default class TestHelpers {
  static async startDb() {
    db = new Database('test', dbConfig);
    await db.connect();
    return db;
  }

  static async stopDb() {
    await db.disconnect();
  }

  static async syncDb() {
    await db.sync();
  }

  static async createNewUser(options = {}) {
    const models = require('../src/models').default;
    const {
      email = 'test@example.com',
      password = 'Test123#',
      roles = ['admin', 'customer'],
      username = 'test',
      firstName = 'David',
      lastName = 'Armendariz',
      refreshToken = 'test-refresh-token',
    } = options;
    const { User } = models;
    const data = {
      email,
      password,
      roles,
      username,
      firstName,
      lastName,
      refreshToken,
    };
    return User.createNewUser(data);
  }

  static getApp() {
    const App = require('../src/app').default;
    return new App().getApp();
  }

  static async registerNewUser(options = {}) {
    const {
      email = 'test@example.com',
      password = 'Test123#',
      endpoint = '/v1/register',
    } = options;
    return request(TestHelpers.getApp())
      .post(endpoint)
      .send({ email, password });
  }
}
