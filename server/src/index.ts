import * as media from '@app/media/media.router';
import { config } from '@app/upload/multer.config';
import * as upload from '@app/upload/upload.router';
import * as dotenvutil from '@app/util/dotenv';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

dotenv.config();
const ENV = dotenvutil.load('NODE_ENV');

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());

// Routes
app.use('/media', media.router);
app.use('/upload', multer(config).array('media'), upload.router);

// https://stackoverflow.com/questions/42186674/typeorm-how-to-use-connection-as-standalone-object-with-types
createConnection({
  type: 'sqlite',
  database: 'db/store.sqlite',
  entities: [ 'src/entity/**/*.ts' ],
  migrations: [ 'src/migration/**/*.ts' ],
  synchronize: ENV !== 'production'
}).then(() => {

  // Start Server
  const PORT = parseInt(dotenvutil.load('PORT'), 10);
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

});
