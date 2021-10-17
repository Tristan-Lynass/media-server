import { DateTime } from 'luxon';

export class Media {
  readonly thumbnailUrl: string;
  readonly url: string;
  constructor(readonly id: string,
              readonly extension: string,
              readonly filename: string,
              readonly originalFilename: string,
              readonly thumbnailFilename: string,
              readonly uploadedAt: DateTime,
              readonly width: number,
              readonly height: number,
              readonly size: number,
              readonly md5: string,
              readonly tags: Set<string>) {
    this.thumbnailUrl = `/media/thumbs-192/${thumbnailFilename}`;
    this.url = `/media/raw/${thumbnailFilename}`;
  }
}
