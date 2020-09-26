import { Dimension } from '@app/entity/Dimension';
import { Media } from '@app/entity/Media';
import { ffprobe } from '@app/util/ffmpeg';
import { isDefined } from '@app/util/filters';
import { handler } from '@app/util/routers';
import { uuid } from '@app/util/uuid';
import { Request } from 'express';
import { FfprobeData, FfprobeStream } from 'fluent-ffmpeg';
import md5 from 'md5-file';
import path from 'path';
import { EntityManager, getConnection } from 'typeorm';

// const VIDEO_TYPES = [ 'm4v', 'mkv', 'mov', 'mp4', 'webm', 'ogv', 'mpg', 'rm', 'gif', 'wmv' ];

// const VISUAL_TYPES = [ 'jpg', 'jpeg', 'png', 'tiff' ].concat(VIDEO_TYPES)

// const TEMPORAL_TYPES = [ 'mp3', 'm4a', 'wav' ].concat(VIDEO_TYPES);

const repository = (em: EntityManager) => em.getRepository(Media);

// TODO: Extract this into a transactionalHandler utility
export const handle = handler(async (req: Request) =>
    await getConnection().manager.transaction(async em => {
      const media = await Promise.all(multerFiles(req).map(toMedia));
      await repository(em).save(media);
    })
);

function multerFiles(req: Request): Express.Multer.File[] {
  return req.files as Express.Multer.File[];
}

async function toMedia(file: Express.Multer.File): Promise<Media> {

  const probeData = await ffprobe(file.path);
  const height = findFileProperty(probeData, stream => stream.height);
  const width = findFileProperty(probeData, stream => stream.width);
  const duration = findFileProperty(probeData, stream => stream.duration);

  const parsed = path.parse(file.originalname); // https://stackoverflow.com/a/31615711/3616885

  return new Media(
    uuid(),
    parsed.name ?? '',
    parsed.ext ?? '',
    file.size,
    await md5(file.path),
    new Date(),
    isDefined(duration) ? parseFloat(duration) : null,
    isDefined(height) && isDefined(width) ? new Dimension(width, height) : null
  );

}

function findFileProperty<T>(probeData: FfprobeData, cb: (stream: FfprobeStream) => T): T | null {
  probeData.streams.forEach(stream => {
    const res = cb(stream);
    if (isDefined(res)) {
      return res;
    }
  });
  return null;
}
