import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as media from '@app/media/media.router';
import * as upload from '@app/upload/upload.router';
import * as dotenvutil from '@app/util/dotenv';

dotenv.config();
const ENV = dotenvutil.load('NODE_ENV');

const PORT = parseInt(dotenvutil.load('PORT'), 10);
const uploads = multer({ dest: '../files/uploads/' });

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());

// Routes
app.use('/media', media.router);
app.use('/upload', uploads.array('media'), upload.router);

// https://stackoverflow.com/questions/42186674/typeorm-how-to-use-connection-as-standalone-object-with-types
createConnection({
  type: 'sqlite',
  database: 'db/store.db',
  entities: [ 'src/entity/**/*.ts' ],
  migrations: [ 'src/migration/**/*.ts' ],
  synchronize: ENV !== 'production'
}).then(() => {

  // Start Server
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

});
