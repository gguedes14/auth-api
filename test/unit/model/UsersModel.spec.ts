import UsersModel from '../../../src/model/UsersModel';
import knex from '../../../database/config/database';

jest.mock('../../../database/config/database');

describe('Model UsersModel', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // static async searchByEmail(options: { email: string }) {
  //   const search = knex('users')
  //     .select('name', 'last_name', 'user_id', 'email')
  //     .where('email', options.email);

  //   return search;
  // }

  test('searchByEmail', async () => {
    const email = 'email@email.com';

    jest.spyOn(knex, 'select').mockImplementation(() => {
      return knex('users').select('name', 'last_name', 'user_id', 'email').where('email', email);
    });

    const result = await UsersModel.searchByEmail({ email });

    expect(result).toBeTruthy();

    expect(knex.select).toHaveBeenCalled();
  });
});
