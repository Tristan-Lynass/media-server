import { uuid } from '@app/util/uuid';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, '../files/uploads/')
  },
  filename: function (_, file, cb) {
    cb(null, uuid() + path.extname(file.originalname))
  }
})

export const config: multer.Options = { storage };
