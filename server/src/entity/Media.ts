import { Column, Entity, PrimaryColumn } from "typeorm";
import { FileData } from "./FileData";
import { Dimension } from "./Dimension";

@Entity()
export class Media {

  @PrimaryColumn()
  private readonly id: string;

  @Column(() => FileData)
  private readonly file: FileData;

  @Column()
  private views: number = 0;

  @Column()
  private deleted: boolean = false;

  @Column()
  private starred: boolean = false;

  @Column()
  private lastView: Date | null = null;

  constructor(id: string,
              name: string,
              extension: string,
              size: number,
              hash: string,
              uploadedAt: Date,
              duration: number | null,
              dimension: Dimension | null
  ) {
    this.id = id;
    this.file = new FileData(name, extension, size, hash, uploadedAt, duration, dimension);
  }

  public getId(): string {
    return this.id;
  }

  public getFile(): FileData {
    return this.file;
  }

  public getViews(): number {
    return this.views;
  }

  public isDeleted(): boolean {
    return this.deleted;
  }

  public setDeleted(deleted: boolean): void {
    this.deleted = deleted;
  }

  public isStarred(): boolean {
    return this.starred;
  }

  public setStarred(starred: boolean): void {
    this.starred = starred;
  }

  public getLastView(): Date | null {
    return this.lastView;
  }

  public markViewed(): void {
    this.lastView = new Date();
    this.views++;
  }
}
