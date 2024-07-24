import { Entity, Repository } from 'typeorm';
import UsersTokens from '../entity/userTokensEntity';

@Entity('tokens')
export class Tokens extends Repository<UsersTokens> {
  public async findByToken(
    token: string,
    email: string,
  ) {
    const findToken = this.findOne({
      where: {
        token,
        email,
      },
    });

    return findToken;
  }
}
