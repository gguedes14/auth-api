import knex from '../../database/config/database';

class UsersModel {
  static async searchByEmail(options: { email: string }) {
    const search = knex('users')
      .select('name', 'last_name', 'user_id', 'email')
      .where({ email: options.email });

    return search;
  }

  static async searchByPassword(options: { password: string }) {
    const searchPassword = knex('users').select('password').where({ password: options.password });

    return searchPassword;
  }

  static async createUser(options: {
    name: string;
    last_name: string;
    email: string;
    user_id: string;
    password: string;
  }) {
    knex('users').insert(options);

    return 'User created with successfully';
  }
}

export default UsersModel;
