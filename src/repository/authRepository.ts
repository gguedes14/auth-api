import { prisma } from "../database/prisma";

export class AuthRepository {
  static async login(email: string) {
    return prisma.user.findUnique({
      where: { email},
    });
  }
}
