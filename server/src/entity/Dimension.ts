import { Column } from 'typeorm';

export class Dimension {

  @Column()
  public readonly width: boolean;

  @Column()
  public readonly height: boolean;

  constructor(width: boolean, height: boolean) {
    this.width = width;
    this.height = height;
  }

}
