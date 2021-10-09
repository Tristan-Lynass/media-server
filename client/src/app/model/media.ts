import { DateTime } from 'luxon';

export class Media {
  readonly thumbnailUrl: string;
  readonly url: string;
  constructor(readonly id: string,
              readonly extension: string,
              readonly filename: string,
              readonly uploadedAt: DateTime,
              readonly width: number,
              readonly height: number,
              readonly size: number,
              readonly md5: string,
              readonly tags: Set<string>) {
    this.thumbnailUrl = `http://localhost:3000/uploads/thumbs/${id}.jpg`;
    this.url = `http://localhost:3000/uploads/${id}.${extension}`;
  }
}
