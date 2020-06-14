import express from 'express';
import * as controller from './upload.controller';

export const router = express.Router();

router.route('/')
	.post(controller.save)