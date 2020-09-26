import { ffprobe as ffprobeFluent, FfprobeData } from 'fluent-ffmpeg';

export function ffprobe(file: string): Promise<FfprobeData> {
  return new Promise((resolve, reject) => {
    ffprobeFluent(file, (err: any, data: FfprobeData) => {
      if (err) return reject(err)
      resolve(data)
    });
  })
}
