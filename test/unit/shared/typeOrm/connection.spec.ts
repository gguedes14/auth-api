// import { connectToDatabase } from '../../../../src/shared/typeOrm/connection';

// jest.mock('typeorm', () => ({
//   createConnection: jest.fn(),
// }));

// describe('Test Connection', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('should connect to database', async () => {
//     const mockConnection = {} as Connection;

//     (createConnection as jest.Mock).mockResolvedValueOnce(mockConnection);

//     const connection = await connectToDatabase();

//     expect(createConnection).toHaveBeenCalledTimes(1);
//     expect(connection).toBe(mockConnection);
//   });
// });
