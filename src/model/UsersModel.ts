import knex from '../../database/config/database';

class UsersModel {
  static async searchByEmail(options: { email: string }) {
    const search = knex('users')
      .select('name', 'last_name', 'user_id', 'email')
      .where('email', options.email);

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
    const insertUser = await knex('users').insert({
      name: options.name,
      last_name: options.last_name,
      email: options.email,
      user_id: options.user_id,
      password: options.password,
    });

    if (!insertUser) {
      return 'User not created';
    }

    if (!options.user_id) {
      const randomNumber = () => Math.floor(Math.random() * 1000);

      const userId = `${options.name}.${options.last_name}${randomNumber()}`.toLowerCase();

      await knex('users')
        .insert({
          name: options.name,
          last_name: options.last_name,
          email: options.email,
          user_id: userId,
          password: options.password,
        })
        .returning('email');
    }
  }
}

export default UsersModel;
