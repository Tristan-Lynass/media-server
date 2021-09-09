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

  readonly media: Media;

  private readonly destroyed = new Subject();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: any,
              readonly bottomSheetRef: MatBottomSheetRef<ManageMediaComponent>,
              private readonly mediaService: MediaService) {
    this.media = data.media;
  }

  ngOnInit(): void {
  }

  add(tag: string): void {
    this.mediaService.addTag(this.media, tag)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.media.tags.add(tag));
  }

  remove(tag: string): void {
    this.mediaService.removeTag(this.media, tag)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.media.tags.delete(tag));
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
