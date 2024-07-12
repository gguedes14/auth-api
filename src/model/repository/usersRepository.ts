import { EntityRepository, Repository } from 'typeorm';
import Users from '../entity/userEntity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  public async findById(id: number): Promise<Users | undefined> {
    const findId = this.findOne({
      where: {
        id,
      },
    });

    return findId;
  }

  public async findByName(name: string): Promise<Users | undefined> {
    const findName = this.findOne({
      where: {
        name,
      },
    });

    return findName;
  }

  public async findByLastName(lastName: string): Promise<Users | undefined> {
    const findLastName = this.findOne({
      where: {
        lastName,
      },
    });

    return findLastName;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findEmail = this.findOne({
      where: {
        email,
      },
    });

    return findEmail;
  }

  public async findByPass(password: string): Promise<Users | undefined> {
    const findPass = this.findOne({
      where: {
        password,
      },
    });

    return findPass;
  }

  public async findByUserId(userId: string): Promise<Users | undefined> {
    const findUserId = this.findOne({
      where: {
        userId,
      },
    });

    return findUserId;
  }

  public async resetPassword(
    email: string,
    password: string,
  ): Promise<Users | undefined> {
    const resetPass = this.findOne({
      where: {
        email,
        password,
      },
    });

    return resetPass;
  }
}
