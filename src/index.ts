import express from 'express';
import config from './config';
import database from './database/db';
import path from 'path';
import { trackController } from './domain/track/track.controller';

const { HOST } = config;
if (!HOST) throw new Error('Host is not defined in environments.');

const startApiServer = async () => {
  const app = express();
  app.use(express.json());

  const PORT = config.API_PORT;
  if (!Number.isInteger(PORT)) throw new Error('Api port is not defined in environments.');

  app.all('*', (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Max-Age', '600');
    next();
  });

  await database.connect(config.MONGO_CONNECTION_URI);

  app.get('/', (_, res) => {
    return res.sendFile(path.join(__dirname, 'client/script/Tracker.js'));
  });
  app.post('/track', trackController.POST);
  app.listen(PORT, HOST, () => console.log(`Running on ${HOST}:${PORT}`));
};

const serveStatic = () => {
  const app = express();

  const PORT = config.STATIC_PORT;
  if (!Number.isInteger(PORT)) throw new Error('Static port is not defined in environments.');

  app.use('/', (_, res) => {
    return res.sendFile(path.join(__dirname, 'client/static/page.html'));
  });
  app.listen(PORT, HOST, () => console.log(`Running on ${HOST}:${PORT}`));
};

startApiServer();
serveStatic();
