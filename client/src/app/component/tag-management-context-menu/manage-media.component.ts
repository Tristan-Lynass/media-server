import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaService } from 'src/app/service/media.service';
import { Media } from 'src/app/service/search.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: [ './manage-media.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageMediaComponent implements OnDestroy {

  // tslint:disable-next-line:variable-name
  private _selected: Media[];

  @Input()
  set selected(selected: Media[]) {
    // Stolen from https://stackoverflow.com/a/55053125, probably could be improved
    this._selected = selected;
    if (this.selected.length === 0) {
      throw new Error();
    } else if (this.selected.length === 1) {
      this.tags = this.selected[0].tags;
    } else {
      this.tags = this.selected.map(v => v.tags)
        .reduce((a, b) => new Set([ ...a ].filter(x => b.has(x))));
    }

    this.size = this.selected.reduce((size, media) => size + media.size, 0);
  }

  get selected(): Media[] {
    return this._selected;
  }

  @Output()
  closed = new EventEmitter();

  private readonly destroyed = new Subject();

  tags: Set<string>;

  size: number;

  constructor(private readonly mediaService: MediaService) {
  }

  add(tag: string): void {
    this.mediaService.addTag(this.selected, tag)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.selected.forEach(media => media.tags.add(tag));
        this.tags.add(tag);
      });
  }

  remove(tag: string): void {
    this.mediaService.removeTag(this.selected, tag)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.selected.forEach(media => media.tags.delete(tag));
        this.tags.delete(tag);
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
