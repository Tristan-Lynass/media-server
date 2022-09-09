import { DateTime } from 'luxon';

export class Media {
  readonly thumbnailUrl: string;
  readonly url: string;

  /*
 deleted: false
 favourite: false
  length: null
 processed: false
 user_id: "73e6c036-ceb2-498c-ab4b-16700f4010b0"
    */

  constructor(readonly id: string,
              readonly extension: string,
              readonly originalFilename: string,
              readonly createdAt: DateTime,
              readonly width: number | undefined,
              readonly height: number | undefined,
              readonly size: number,
              readonly md5: string,
              readonly tags: Set<string>) {
    this.thumbnailUrl = `/uploads/thumbs/${id}.jpg`;
    this.url = `/uploads/${id}.${extension}`;
  }
}
