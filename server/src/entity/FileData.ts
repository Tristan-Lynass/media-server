import { Column } from 'typeorm';
import { Dimension } from './Dimension';

export class FileData {

  @Column()
  public readonly name: string;

  @Column()
  public readonly extension: string;

  @Column()
  public readonly size: number;

  @Column()
  public readonly hash: string;

  @Column()
  public readonly uploadedAt: Date;

  @Column()
  public readonly duration: number | null;

  @Column(() => Dimension)
  public readonly dimension: Dimension | null;

  constructor(name: string, extension: string, size: number, hash: string, uploadedAt: Date, duration: number | null, dimension: Dimension | null) {
    this.name = name;
    this.extension = extension;
    this.size = size;
    this.hash = hash;
    this.uploadedAt = uploadedAt;
    this.duration = duration;
    this.dimension = dimension;
  }

}
