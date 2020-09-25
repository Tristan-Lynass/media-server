import { Request, Response } from 'express';
import { uuid } from '../util/uuid';
import { Dimension } from '../entity/Dimension';
import { getRepository } from 'typeorm';
import { Media } from '../entity/Media';
import { handler } from '../util/routers';

const respository = () => getRepository(Media);

export const findAll = handler(async (_: Request, res: Response) => {
  res.status(200).send(await respository().find());
});

export const findOne = handler(async (req: Request, res: Response) => {
  res.status(200).send(await respository().findOne(req.params.id));
});

export const create = handler(async (_: Request, res: Response) => {
  const media = new Media(
    uuid(),
    'holiday-pic',
    'png',
    324234,
    '234234234',
    new Date(),
    null,
    new Dimension(230, 600)
  );

  res.status(200).send(await respository().save(media));
});
