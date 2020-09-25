import { Dimension } from '@app/entity/Dimension';
import { Media } from '@app/entity/Media';
import { handler } from '@app/util/routers';
import { uuid } from '@app/util/uuid';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

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
