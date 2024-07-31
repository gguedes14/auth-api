import knex from '../../database/config/database';

class TokensModel {
  static async searchByToken(options: { token: string }) {
    const tokens = knex('tokens').where('token', options.token);

    return tokens;
  }

  static async saveToken(options: { email: string; token: string }) {
    knex('tokens').insert(options);

    return 'Token saved with successfully';
  }
}

export default TokensModel;
