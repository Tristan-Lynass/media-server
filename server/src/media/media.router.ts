import { findAll, findOne } from '@app/media/media.controller';
import express from 'express';
// import * as controller from './media.controller';

export const router = express.Router();

router.route('/')
  .get(findAll);

router.route('/:id')
  .get(findOne);
