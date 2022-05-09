import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

interface Config {
  HOST: string;
  STATIC_PORT: number;
  API_PORT: number;
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_HOST: string;
  MONGO_PORT: number;
  MONGO_DB_NAME: string;
  MONGO_CONNECTION_URI: string;
}

const config: Config = {
  HOST: process.env.HOST,
  STATIC_PORT: +process.env.STATIC_PORT,
  API_PORT: +process.env.API_PORT,
  MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_PORT: +process.env.MONGO_PORT,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_CONNECTION_URI: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`
};

export default config;
