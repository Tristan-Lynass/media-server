import { Media } from '../entity/Media';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

// TODO: Make sure these delete on cascase
@Entity()
export class Tag {

  // https://github.com/typeorm/typeorm/issues/3238
  @ManyToOne(() => Media,  { primary: true })
  public readonly media: Media;

  @PrimaryColumn()
  public readonly name: string;

  constructor(media: Media, name: string) {
    this.media = media;
    this.name = name;
  }
}

