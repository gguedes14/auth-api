import { getConnection } from 'typeorm/index.js';
import connection from '../../../../src/shared/typeOrm/connection';

describe('Test Connection', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test create', async () => {
    const createConnectionSpy = jest.spyOn(connection, 'create');

    await connection.create();

    expect(createConnectionSpy).toHaveBeenCalled();

    const defaultConnection = getConnection();
    expect(defaultConnection.isConnected).toBeTruthy();
  });

  test('Test close', async () => {
    const closeConnectionSpy = jest.spyOn(connection, 'close');

    await connection.close();

    expect(closeConnectionSpy).toHaveBeenCalled();

    const defaultConnection = getConnection();
    expect(defaultConnection.isConnected).toBeFalsy();
  });
});
