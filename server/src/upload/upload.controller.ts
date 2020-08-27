import { Request, Response } from 'express';
import { handler } from '@app/util/routers';
// import { isNotDefined } from '@app/util/filters';
import MediaModel from '@app/media/media';
import { FileAttribute } from '@app/media/media';
import md5 from 'md5-file';
import path from 'path';
import mongoose from 'mongoose';

// const VIDEO_TYPES = [ 'm4v', 'mkv', 'mov', 'mp4', 'webm', 'ogv', 'mpg', 'rm', 'gif', 'wmv' ];

// const VISUAL_TYPES = [ 'jpg', 'jpeg', 'png', 'tiff' ].concat(VIDEO_TYPES)

// const TEMPORAL_TYPES = [ 'mp3', 'm4a', 'wav' ].concat(VIDEO_TYPES);


export const handle = handler(async (req: Request, res: Response) => {
  await transaction(res, async (session) => {
    const multerFiles = req.files as Express.Multer.File[];
    const parsedFiles = await Promise.all(multerFiles.map(parseFileInformation));
    parsedFiles.forEach(file => new MediaModel({ file }).save({ session }));

    // const multerFiles = req.files as Express.Multer.File[];
    // const parsedFiles = await Promise.all(multerFiles.map(parseFileInformation));
    // parsedFiles.forEach(file => new MediaModel({ file }).save());res.status(200).send();
  });
});

async function transaction(res: Response, fn: (session: mongoose.ClientSession) => Promise<any>): Promise<void> {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await fn(session);
    res.status(200).send();
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send();
  }
}

async function parseFileInformation(file: Express.Multer.File): Promise<FileAttribute> {
  return {
    ...filenameParts(file.originalname),
    size: file.size,
    hash: await md5(file.path)
  };
}

// https://stackoverflow.com/a/31615711/3616885
function filenameParts(filename: string): Filename {
  const parsed = path.parse(filename);
  return { name: parsed.name ?? '', extension: parsed.ext ?? '' };
}

interface Filename {
  name: string;
  extension: string;
}