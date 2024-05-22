import { EntityRepository, Repository } from 'typeorm';
import Users from '../entity/userEntity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  public async findByEmail(email: string): Promise<Users | undefined> {
    const findEmail = this.findOne({
      where: {
        email,
      },
    });

    return findEmail;
  }
}
