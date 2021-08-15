export class UploadProgress {

  readonly isFinished: boolean;
  readonly percent: number;

  constructor(readonly id: string,
              readonly loaded: number,
              readonly total: number | undefined,
              readonly filename: string) {
    this.isFinished = this.loaded === this.total;
    this.percent = this.total == null || this.total === 0 ? 0 : 100 * (this.loaded / this.total);
  }

  public update(loaded: number, total: number | undefined): UploadProgress {
    return new UploadProgress(this.id, loaded, total, this.filename);
  }
}
