import { EntityRepository, Repository } from 'typeorm';
import UsersTokens from '../entity/userTokensEntity';

@EntityRepository(UsersTokens)
export class Tokens extends Repository<UsersTokens> {
  public async findByToken(
    token: string,
    email: string,
  ): Promise<UsersTokens | undefined> {
    const findToken = this.findOne({
      where: {
        token,
        email,
      },
    });

    return findToken;
  }
}
