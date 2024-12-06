import knex from '../../database/config/database';

class TokensModel {
  static async searchByToken(options: { id: number; token: string }) {
    const tokens = knex('tokens').where('token', options.token);

    return tokens;
  }

  static async saveToken(options: { email: string; token: string }) {
    const getEmail = await knex('users').where({ email: options.email }).first();

    const saveTokens = await knex('tokens').insert({
      token: options.token,
      token_id: getEmail.id,
    });

    return saveTokens;
  }
}

export default TokensModel;
