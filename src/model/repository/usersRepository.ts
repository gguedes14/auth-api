import { Entity, Repository } from 'typeorm';
import Users from '../entity/userEntity';

@Entity()
export class UsersRepository extends Repository<Users> {
  public async findById(id: number){
    const findById = this.findOne({
      where: {
        id,
      },
    });

    return findById;
  }

  public async findByName(name: string){
    const findName = this.findOne({
      where: {
        name,
      },
    });

    return findName;
  }

  public async findByLastName(lastName: string){
    const findLastName = this.findOne({
      where: {
        lastName,
      },
    });

    return findLastName;
  }

  public async findByEmail(email: string){
    const findEmail = this.findOne({
      where: {
        email,
      },
    });

    return findEmail;
  }

  public async findByPass(password: string){
    const findPass = this.findOne({
      where: {
        password,
      },
    });

    return findPass;
  }

  public async findByUserId(userId: string){
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
  ){
    const resetPass = this.findOne({
      where: {
        email,
        password,
      },
    });

    return resetPass;
  }
}
