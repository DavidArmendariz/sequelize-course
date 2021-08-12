import '../src/config';
import Database from '../src/database';
import dbConfig from '../src/config/database';

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
}
