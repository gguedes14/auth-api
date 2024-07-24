// import { getCustomRepository } from 'typeorm/index.js';
// import authService from '../../../src/services/authService';
// import ApiError from '../../../src/enum/ApiError';
// import Env from '../../../src/utils/envVariables';
// import { sign } from 'jsonwebtoken';

// jest.mock('typeorm', () => {
//   const actualTypeorm = jest.requireActual('typeorm');
//   return {
//     ...actualTypeorm,
//     getCustomRepository: jest.fn(),
//   };
// });

// describe('Test authService', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('Authenticate user', async () => {
//     const usersRepositoryMock = {
//       findByEmail: jest.fn().mockResolvedValue({ id: 1 }),
//       findByPass: jest.fn().mockResolvedValue({ id: 1 }),
//     };

//     (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

//     const email = 'email@email.com';

//     const password = 'password';

//     jest.spyOn(Env, 'getTokenJwt').mockReturnValue('token');

//     const token = sign({}, 'token', {
//       subject: '1',
//       expiresIn: '2d',
//     });

//     const result = await authService.authenticate(email, password);

//     expect(result).toEqual({
//       auth: { id: 1 },
//       token,
//     });

//     expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
//     expect(usersRepositoryMock.findByPass).toHaveBeenCalledWith(password);
//   });

//   test('Authenticate user with wrong email', async () => {
//     const usersRepositoryMock = {
//       findByEmail: jest.fn().mockResolvedValue(undefined),
//     };

//     (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

//     const email = 'email@email.com';

//     const password = 'password';

//     const result = await authService.authenticate(email, password);

//     expect(result).toBeInstanceOf(ApiError);
//   });

//   test('Save token', async () => {
//     const tokensRepositoryMock = {
//       create: jest.fn(),
//       save: jest.fn(),
//     };

//     (getCustomRepository as jest.Mock).mockReturnValue(tokensRepositoryMock);

//     jest.spyOn(Env, 'getTokenJwt').mockReturnValue('token');

//     const token = sign({}, Env.getTokenJwt());

//     await authService.saveToken(token);

//     expect(tokensRepositoryMock.create).toHaveBeenCalledWith({ token });
//     expect(tokensRepositoryMock.save).toHaveBeenCalled();
//   });
// });
