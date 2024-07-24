// import loginController from '../../../src/controller/createUserController';
// import authService from '../../../src/services/authService';
// import loginService from '../../../src/services/createUsersService';
// import { Request, Response } from 'express';

// describe('Test loginController', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('Test create', async () => {
//     jest.spyOn(authService, 'saveToken').mockResolvedValue('testToken');

//     const requestMock = {
//       body: {
//         name: 'Jon',
//         lastName: 'Doe',
//         userId: 'test',
//         email: 'test@email.com',
//         password: 'testPass',
//         token: 'testToken',
//       },
//     } as Request;

//     const responseMock = {
//       json: jest.fn(),
//     } as unknown as Response;

//     const createUserMock = jest
//       .spyOn(loginService.prototype, 'createUser')
//       .mockResolvedValue(requestMock.body);

//     await new loginController().create(requestMock, responseMock);

//     expect(createUserMock).toHaveBeenCalledTimes(1);

//     expect(responseMock.json).toHaveBeenCalledTimes(1);

//     expect(responseMock.json).toHaveBeenCalledWith({
//       name: 'Jon',
//       lastName: 'Doe',
//       userId: 'test',
//       email: 'test@email.com',
//       password: 'testPass',
//       token: 'testToken',
//     });

//     expect(authService.saveToken).toHaveBeenCalledTimes(1);

//     expect(authService.saveToken).toHaveBeenCalledWith('testToken');
//   });
// });
