import Knex from 'knex';
import config from './knexfile';

const environment = process.env.APP_ENV || 'development';

// @ts-ignore
const connection = Knex(config[environment]);

export default connection;
