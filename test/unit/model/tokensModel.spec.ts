import TokensModel from '../../../src/model/tokensModel';
import knex from '../../../database/config/database';
import { KnexMock } from '../../helpers';


const options = {
  id,
  token: 'token',
}

const setup = () => {
  const knex = new KnexMock({
    whereResults: [{ id: 1, token: 'token' }],
    insertResults: [{ email: 'email', token: 'token' }],
  });

  jest.spyOn(TokensModel, 'searchByToken').mockResolvedValue([{ id: 1, token: 'token' }]);
}
describe('TokensModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // test('searchByToken', async () => {
  //   const options = {
  //     id: 1,
  //     token: 'token',
  //   };

  //   const expectedSearchResult = [{ id: 1, token: 'token' }];
  //   knex().where.mockResolvedValueOnce(expectedSearchResult);

  //   const result = await TokensModel.searchByToken(options);

  //   expect(result).toEqual(expectedSearchResult);
  //   expect(knex().where).toHaveBeenCalledWith('token', 'token');
  // });

  // test('saveToken', async () => {
  //   const options = {
  //     email: 'email',
  //     token: 'token',
  //   };

  //   const expectedSaveResult = [{ email: 'email', token: 'token' }];
  //   KnexMock.prototype.insert.mockResolvedValueOnce(expectedSaveResult);

  //   const result = await TokensModel.saveToken(options);

  //   expect(result).toEqual(expectedSaveResult);
  //   expect(knex().insert).toHaveBeenCalledWith({ email: 'email', token: 'token' });
  // });
});

