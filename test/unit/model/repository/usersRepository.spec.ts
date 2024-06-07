import { UsersRepository } from '../../../../src/model/repository/usersRepository';
import Users from '../../../../src/model/entity/userEntity';
import { Repository } from 'typeorm/index.js';

describe('Test UsersRepository', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test findByName', async () => {
    const nameMock = 'test';
    const userMock = new Users();

    jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(userMock);

    const user = await new UsersRepository().findByName(nameMock);

    expect(user).toBe(userMock);
  });

  test('Test findByLastName', async () => {
    const lastNameMock = 'test';
    const userMock = new Users();

    jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(userMock);

    const user = await new UsersRepository().findByLastName(lastNameMock);

    expect(user).toBe(userMock);
  });

  test('Test findByEmail', async () => {
    const emailMock = 'test@email.com';
    const userMock = new Users();

    jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(userMock);

    const user = await new UsersRepository().findByEmail(emailMock);

    expect(user).toBe(userMock);
  });

  test('Test findByPass', async () => {
    const passMock = 'pass';

    jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(passMock);

    const user = await new UsersRepository().findByPass(passMock);

    expect(user).toBe(passMock);
  });

  test('Test findByUserId', async () => {
    const userIdMock = 'test';
    const userMock = new Users();

    jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(userMock);

    const user = await new UsersRepository().findByUserId(userIdMock);

    expect(user).toBe(userMock);
  });
});
