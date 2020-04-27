import express from "express";
import * as controller from './media.controller';

export const router = express.Router();

router.route('/')
	.get(controller.findAll)
  .post(controller.create);

router.route('/:id')
  .get(controller.findOne);