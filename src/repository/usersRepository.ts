import { prisma } from "../database/prisma";
import { Prisma, User } from "@prisma/client";

export class UsersRepository {
  static async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
        deletedAt: true
      },
    });
  }

  static async findByEmail(email: string) {
    if (!email) {
      throw new Error("Email is required");
    }

    return prisma.user.findUnique({
      where: { email },
      omit: {
        password: true,
      },
    });
  }
}
