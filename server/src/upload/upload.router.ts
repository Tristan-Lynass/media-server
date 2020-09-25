import * as controller from '@app/upload/upload.controller';
import express from 'express';

export const router = express.Router();

router.route('/')
  .post(controller.handle);
