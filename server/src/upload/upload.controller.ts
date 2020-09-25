import { Media } from '@app/entity/Media';
import { handler } from '@app/util/routers';
import { uuid } from '@app/util/uuid';
import { Request, Response } from 'express';
import md5 from 'md5-file';
import path from 'path';
import { getRepository } from 'typeorm';

// const VIDEO_TYPES = [ 'm4v', 'mkv', 'mov', 'mp4', 'webm', 'ogv', 'mpg', 'rm', 'gif', 'wmv' ];

// const VISUAL_TYPES = [ 'jpg', 'jpeg', 'png', 'tiff' ].concat(VIDEO_TYPES)

// const TEMPORAL_TYPES = [ 'mp3', 'm4a', 'wav' ].concat(VIDEO_TYPES);

const respository = () => getRepository(Media);

// TODO: Transaction
export const handle = handler(async (req: Request, res: Response) => {
  const multerFiles = req.files as Express.Multer.File[];
  const media = await Promise.all(multerFiles.map(parse));
  await respository().save(media);
  res.status(200).send();
});

// async function transaction(res: Response, fn: (session: mongoose.ClientSession) => Promise<any>): Promise<void> {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     await fn(session);
//     res.status(200).send();
//   } catch (e) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(500).send();
//   }
// }

async function parse(file: Express.Multer.File): Promise<Media> {

  const parsed = path.parse(file.originalname); // https://stackoverflow.com/a/31615711/3616885

  return new Media(
    uuid(),
    parsed.name ?? '',
    parsed.ext ?? '',
    file.size,
    await md5(file.path),
    new Date(),
    null, // TODO
    null // TODO
  );

}
