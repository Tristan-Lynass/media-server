import { Media } from '@app/entity/Media';
import { handler } from '@app/util/routers';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

const respository = () => getRepository(Media);

export const findAll = handler(async (_: Request, res: Response) => {
  res.status(200).send(await respository().find());
});

export const findOne = handler(async (req: Request, res: Response) => {
  res.status(200).send(await respository().findOne(req.params.id));
});
