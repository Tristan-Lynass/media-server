import { Request, Response } from 'express';
import { handler } from '../util/routers';

export const save = handler(async (req: Request, res: Response) => {
  console.log(req);
  res.status(200).send();
});
