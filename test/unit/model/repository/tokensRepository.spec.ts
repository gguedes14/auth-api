import UsersTokens from '../../../../src/model/entity/userTokensEntity';
import { Repository } from 'typeorm/index.js';
import { Tokens } from '../../../../src/model/repository/tokensRepository';

describe('Test TokensRepository', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test findByToken', async () => {
    const tokenMock = 'test';
    const tokenEntityMock = new UsersTokens();

    jest
      .spyOn(Repository.prototype, 'findOne')
      .mockResolvedValue(tokenEntityMock);

    const token = await new Tokens().findByToken(tokenMock);

    expect(token).toBe(tokenEntityMock);
  });
});
