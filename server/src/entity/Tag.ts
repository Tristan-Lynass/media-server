import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Media } from '@app/entity/Media';

// TODO: Make sure these delete on cascade
@Entity()
export class Tag {

  // https://github.com/typeorm/typeorm/issues/3238
  @ManyToOne(() => Media, { primary: true, cascade: true })
  public readonly media: Media;

  @PrimaryColumn()
  public readonly name: string;

  constructor(media: Media, name: string) {
    this.media = media;
    this.name = name;
  }
}

