import TestsHelpers from '../tests-helpers';
import models from '../../src/models';

describe('Role', () => {
  beforeAll(async () => {
    await TestsHelpers.startDb();
  });

  afterAll(async () => {
    await TestsHelpers.stopDb();
  });

  beforeEach(async () => {
    await TestsHelpers.syncDb();
  });

  it('should delete the role records if the user is deleted', async () => {
    const { Role } = models;
    const rolesForNewUser = ['admin', 'customer'];
    const user = await TestsHelpers.createNewUser({ roles: rolesForNewUser });
    let rolesCount = await Role.count();
    expect(rolesCount).toEqual(rolesForNewUser.length);
    await user.destroy();
    rolesCount = await Role.count();
    expect(rolesCount).toEqual(0);
  });
});
