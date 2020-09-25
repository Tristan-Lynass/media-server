import express from 'express';
import * as controller from '@app/upload/upload.controller';

export const router = express.Router();

router.route('/')
	.post(controller.handle);
