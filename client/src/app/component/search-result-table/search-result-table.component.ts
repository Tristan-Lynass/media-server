import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IPageInfo } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManageMediaComponent } from 'src/app/component/tag-management-context-menu/manage-media.component';
import { Media, SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: [ './search-result-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTableComponent implements OnDestroy {

  private readonly destroyed = new Subject();

  results = [];

  tags = []; // FIXME: Watch out for this with subscriptions

  isLoading = true;

  private finished = false;

  activeMedia: Media = null;

  constructor(private readonly searchService: SearchService,
              private readonly cd: ChangeDetectorRef,
              private readonly bottomSheet: MatBottomSheet) {
    this.isLoading = true;
    this.searchService.search(this.tags).pipe(
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.results = result;
      this.cd.markForCheck();
      this.isLoading = false;
    });
  }

  public onViewportEnd(event: IPageInfo): void {
    const THRESHHOLD = 25;

    if (event.endIndex + THRESHHOLD > this.results.length && !this.isLoading && !this.finished) {

      this.isLoading = true;
      this.searchService.nextPage().pipe(
        takeUntil(this.destroyed) // fucken review
      ).subscribe(result => {
        if (result.length < SearchService.CHUNK_SIZE) {
          this.finished = true;
        }

        this.results = this.results.concat(result);
        this.cd.markForCheck();
        this.isLoading = false;
      });
    }
  }

  public onClick(media: Media, event: MouseEvent): void {
    event.preventDefault();
    if (this.activeMedia === media) {
      this.bottomSheet._openedBottomSheetRef.dismiss();
      this.cd.markForCheck();
      return;
    }

    this.activeMedia = media;
    this.bottomSheet.open(ManageMediaComponent, {
      hasBackdrop: false,
      data: { media },
      // panelClass: 'custom-width'
    }).afterDismissed().pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => {
      if (this.bottomSheet._openedBottomSheetRef == null) {
        this.activeMedia = null;
        this.cd.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed.complete();
  }
}
