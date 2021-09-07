import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchBarComponent } from 'src/app/component/search-bar/search-bar.component';
import { ManageMediaComponent } from 'src/app/component/tag-management-context-menu/manage-media.component';
import { Media, SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: [ './search-result-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTableComponent implements OnDestroy {
  // items = new Array(100).fill('https://picsum.photos/200/200');

  // @ViewChild(VirtualScrollerComponent)
  // private virtualScroller: VirtualScrollerComponent;

  private readonly destroyed = new Subject();

  results = [];

  tags = []; // FIXME: Watch out for this with subscriptions

  private isLoading = true;

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
    this.activeMedia = media;
    this.bottomSheet.open(ManageMediaComponent, {
      hasBackdrop: false,
      data: { media },
      // panelClass: 'custom-width'
    });
  }

  ngOnDestroy(): void {
    this.destroyed.complete();
  }
}
