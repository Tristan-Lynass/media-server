import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IPageInfo } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManageMediaComponent } from 'src/app/component/tag-management-context-menu/manage-media.component';
import { SelectionController } from 'src/app/selection.controller';
import { Media, SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: [ './search-result-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTableComponent implements OnDestroy {

  private readonly destroyed = new Subject();

  results: ResultItem[] = [];

  tags = []; // FIXME: Watch out for this with subscriptions

  isLoading = true;

  private allResultsLoaded = false;

  readonly selectionController = new SelectionController();

  constructor(private readonly searchService: SearchService,
              private readonly cd: ChangeDetectorRef,
              private readonly bottomSheet: MatBottomSheet) {
    this.isLoading = true;
    this.searchService.search(this.tags).pipe(
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.results = result.map((v, i) => new ResultItem(i, v));
      this.cd.markForCheck();
      this.isLoading = false; // TODO: Why is this after markForCheck?
    });
  }

  public onViewportEnd(event: IPageInfo): void {
    const THRESHHOLD = 25;

    if (event.endIndex + THRESHHOLD > this.results.length && !this.isLoading && !this.allResultsLoaded) {

      this.isLoading = true;
      this.searchService.nextPage().pipe(
        takeUntil(this.destroyed) // fucken review
      ).subscribe(result => {
        if (result.length < SearchService.CHUNK_SIZE) {
          this.allResultsLoaded = true;
        }

        const maxIndex = this.results.length;
        this.results = this.results.concat(result.map((v, i) => new ResultItem(maxIndex + i, v)));
        this.cd.markForCheck();
        this.isLoading = false; // TODO: Why is this after markForCheck?
      });
    }
  }

  // FIXME: This is whole method is pre dodge, probably worth while *trying* to clean up once this feature works
  public onClick(index: number, event: MouseEvent): void {
    event.preventDefault();

    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      this.selectionController.onClick(index);
    } else if (event.shiftKey) {
      this.selectionController.onShiftClick(index);
    } else if (event.ctrlKey) {
      this.selectionController.onControlClick(index);
    } else {
      return; // Meaningless
    }

    this.cd.markForCheck();

    if (this.selectionController.size() === 0) {
      this.bottomSheet._openedBottomSheetRef.dismiss();
      this.cd.markForCheck();
      return;
    }

    this.bottomSheet.open(ManageMediaComponent, {
      hasBackdrop: false,
      data: { media: Array.from(this.selectionController.indices()).map(i => this.results[i].media) }
    }).afterDismissed().pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => {
      if (this.bottomSheet._openedBottomSheetRef == null) {
        this.selectionController.clear();
        this.cd.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed.complete();
  }
}

class ResultItem {
  constructor(public readonly index: number,
              public readonly media: Media) {
  }
}

