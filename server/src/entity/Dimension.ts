import { Column } from 'typeorm';

export class Dimension {

  @Column({ nullable: true })
  public readonly width: number;

  @Column({ nullable: true })
  public readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

}
