/**
 * Maintains selected indices state
 */
export class SelectionController {
  private start: number | null = null;
  private stop: number | null = null;
  private readonly excluded = new Set<number>();
  private readonly included = new Set<number>();

  private static inclusiveSpread(start: number, stop: number): number[] {
    const list = [];
    for (let i = start; i <= stop; i++) {
      list.push(i);
    }
    return list;
  }

  public onClick(index: number): void {
    if (this.start === index && this.stop === index) {
      this.start = null;
      this.stop = null;
    } else {
      this.start = index;
      this.stop = index;
      this.excluded.clear();
      this.included.clear();
    }
  }

  public onShiftClick(index: number): void {
    // TODO
  }

  public onControlClick(index: number): void {
    if (this.start === index && this.stop === index) {
      this.start = null;
      this.stop = null;
    } else if (this.start === index) {
      let nextStart = this.start + 1;
      while (this.excluded.has(nextStart)) {
        this.excluded.delete(nextStart);
        nextStart++;
      }
      this.start = nextStart;
    } else if (this.stop === index) {
      let nextStop = this.stop - 1;
      while (this.excluded.has(nextStop)) {
        this.excluded.delete(nextStop);
        nextStop--;
      }
      this.stop = nextStop;
    } else if (this.start < index && this.stop > index) {
      if (this.excluded.has(index)) {
        this.excluded.delete(index);
      } else {
        this.excluded.add(index);
      }
    } else {
      if (this.included.has(index)) {
        this.included.delete(index);
      } else {
        this.included.add(index);
      }
    }
  }

  public isSelected(index: number): boolean {
    if (this.start === null && this.stop === null) {
      return false;
    }

    return index < this.start || index > this.stop
      ? this.included.has(index)
      : !this.excluded.has(index);
  }

  public clear(): void {
    this.start = null;
    this.stop = null;
    this.excluded.clear();
    this.included.clear();
  }

  public size(): number {
    if (this.start === null && this.stop === null) {
      return 0;
    }
    return (this.stop - this.start) - this.excluded.size + this.included.size;
  }

  public indices(): Set<number> {
    if (this.start === null && this.stop === null) {
      return new Set();
    }

    return new Set([
      ...this.included,
      ...SelectionController.inclusiveSpread(this.start, this.stop).filter(i => !this.excluded.has(i))
    ]);
  }

}
