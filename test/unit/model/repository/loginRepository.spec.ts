import { UsersRepository } from '../../../../src/model/repository/loginRepository';
import Users from '../../../../src/model/entity/userEntity';
import { Repository } from 'typeorm/index.js';

describe('Test UsersRepository', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test findByEmail', async () => {
    const emailMock = 'test@email.com';
    const userMock = new Users();

    jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(userMock);

    const user = await new UsersRepository().findByEmail(emailMock);

    expect(user).toBe(userMock);
  });
});
