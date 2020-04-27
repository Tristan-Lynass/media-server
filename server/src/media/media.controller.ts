import { Request, Response } from "express";
import { handler } from '../util/routers';
import Media from './media';

export const findAll = handler(async (_: Request, res: Response) => {
  res.status(200).send(await Media.find());
});

export const findOne = handler(async (req: Request, res: Response) => {
  res.status(200).send(await Media.findById(req.params.id));
});

export const create = handler(async (req: Request, res: Response) => {
  const m = new Media(req.body);
  res.status(200).send(await m.save());
});
