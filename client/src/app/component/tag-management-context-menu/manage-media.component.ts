import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
export class ManageMediaComponent implements OnInit, OnDestroy {

  readonly selected: Media[];

  private readonly destroyed = new Subject();

  readonly tags: Set<string>;

  readonly size: number;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: any,
              readonly bottomSheetRef: MatBottomSheetRef<ManageMediaComponent>,
              private readonly mediaService: MediaService) {
    this.selected = data.media;
    // Stolen from https://stackoverflow.com/a/55053125, probably could be improved
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

  ngOnInit(): void {
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
