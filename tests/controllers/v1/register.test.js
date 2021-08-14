import TestsHelpers from '../../tests-helpers';
import models from '../../../src/models';
import request from 'supertest';

describe('register', () => {
  let app;

  beforeAll(async () => {
    await TestsHelpers.startDb();
    app = TestsHelpers.getApp();
  });

  afterAll(async () => {
    await TestsHelpers.stopDb();
  });

  beforeEach(async () => {
    await TestsHelpers.syncDb();
  });

  it('should register a new user successfully', async () => {
    const data = {
      email: 'test@example.com',
      password: 'Test123#',
      username: 'test',
      firstName: 'David',
      lastName: 'Armendariz',
      roles: ['admin', 'customer'],
    };
    const response = await request(app)
      .post('/v1/register')
      .send(data)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual('User successfully registered');
    const { User, Role, RefreshToken } = models;
    const users = await User.findAll({ include: [Role, RefreshToken] });
    expect(users.length).toEqual(1);
    const newUser = users[0];
    expect(newUser.email).toEqual(data.email);
    expect(newUser.username).toEqual(data.username);
    expect(newUser.firstName).toEqual(data.firstName);
    expect(newUser.lastName).toEqual(data.lastName);
    expect(newUser.password).toBeUndefined();
    expect(newUser.Roles.length).toEqual(data.roles.length);
    const savedRoles = newUser.Roles.map((savedRole) => savedRole.role).sort();
    expect(savedRoles).toEqual(data.roles.sort());
    expect(newUser.RefreshToken.token).toEqual(expect.any(String));
  });

  it('should not create a new user if it already exists', async () => {
    await request(app)
      .post('/v1/register')
      .send({ email: 'test@example.com', password: 'Test123#' })
      .expect(200);
    const response = await request(app)
      .post('/v1/register')
      .send({ email: 'test@example.com', password: 'Test123#' })
      .expect(200);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('User already exists');
  });
});
