import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Media } from "./Media";

@Entity()
export class Tag {

  @PrimaryColumn()
  @ManyToOne(() => Media)
  @JoinColumn()
  public readonly media: Media;

  @PrimaryColumn()
  public readonly name: string;

  constructor(media: Media, name: string) {
    this.media = media;
    this.name = name;
  }
}

