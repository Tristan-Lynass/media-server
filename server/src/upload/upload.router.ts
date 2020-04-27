import express, { Request, Response }  from "express";

export const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log(req);
  res.status(200).send();
});