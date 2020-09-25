import { Column } from 'typeorm';

export class Dimension {

  @Column()
  public readonly width: number;

  @Column()
  public readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

}
