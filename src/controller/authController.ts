// import { sign } from 'jsonwebtoken';
// import createUserModel from '../models/UsersModel';
// import { Request, Response } from 'express';

// class AuthController {
//   public async authenticate(request: Request, response: Response): Promise<Response> {
//     const { email, password } = request.body;

//     const user = await createUserModel.searchByEmail({
//       email,
//     });

//     const userPassword = await createUserModel.searchByPassword({
//       password,
//     });

//     if (!user || !userPassword) {
//       return response.status(400).json({ message: 'User not found' });
//     }

//     const token = sign({ email }, process.env.JWT_TOKEN || '', {
//       expiresIn: '30d',
//     });

//     return response.status(200).json({ message: 'Authentication successful', token });
//   }
// }

// export default AuthController;
