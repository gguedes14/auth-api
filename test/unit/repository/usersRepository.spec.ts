import { UsersRepository } from '../../../src/repository/usersRepository';
import { prisma } from '../../../src/database/prisma';

jest.mock('../../../src/database/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('UserRepository - create', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Create user', async () => {
    const input = {
      name: 'Gabriel',
      lastName: 'Guedes',
      taxId: '12345678900',
      email: 'gabriel@email.com',
      password: 'hashedpassword',
      birthDate: new Date(),
    };

    const expectedResult = {
      id: '1',
      name: 'Gabriel',
      lastName: 'Guedes',
      taxId: '12345678900',
      email: 'gabriel@email.com',
      password: 'hashedpassword',
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    jest.spyOn(prisma.user, 'create').mockResolvedValue(expectedResult);

    const result = await UsersRepository.createUser(input);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: input,
    });

    expect(result).toEqual(expectedResult);
  });

  test('Find user by Id', async () => {
    const id = '123546654';

    const expectedResult = {
      id,
      name: 'Gabriel',
      lastName: 'Guedes',
      taxId: '12345678900',
      email: 'gabriel@email.com',
      password: 'hashedpassword',
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(expectedResult);

    const result = await UsersRepository.findById(id);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id },
      omit: {
        deletedAt: true,
        password: true,
      },
    });

    expect(result).toEqual(expectedResult);
  });

  test('Find user by email', async () => {
    const expectedResult = {
      id: '123546654',
      name: 'Gabriel',
      lastName: 'Guedes',
      taxId: '12345678900',
      email: 'gabriel@email.com',
      password: 'hashedpassword',
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(expectedResult);

    const result = await UsersRepository.findByEmail(expectedResult.email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "gabriel@email.com" },
      omit: {
        password: true,
        deletedAt: true,
      }
    });

    expect(result).toEqual(expectedResult);
  });

  test('Find user by email when email not sent', async () => {
    await expect(UsersRepository.findByEmail('')).rejects.toThrow('Email is required');

    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  test('Update user by ID', async () => {
    const id = '123546654';

    const expectedResult = {
      id: '123343654',
      name: 'Gabriel',
      lastName: 'Guedes',
      taxId: '12345678900',
      email: 'gabriel@email.com',
      password: 'hashedpassword',
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const updateData = {
      name: 'Gabriel',
      lastName: 'Guedes',
      taxId: '12345678900',
      email: 'gabriel@email.com',
      birthDate: '2024-01-01',
    };

    jest.spyOn(prisma.user, 'update').mockResolvedValue(expectedResult);

    const result = await UsersRepository.updateUserById(id, updateData);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
       omit: {
        password: true,
        deletedAt: true,
      }
    });

    expect(result).toEqual(expectedResult);
  });
});
