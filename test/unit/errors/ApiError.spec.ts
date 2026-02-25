import { AppError } from '../../../src/errors/ApiError';

describe('Test Api enum', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test message error', () => {
    const messageMock = 'bad request';
    const statusMock = 400;

    const apiError = new AppError(statusMock, messageMock);

    expect(apiError.message).toBe(messageMock);
  });
});
