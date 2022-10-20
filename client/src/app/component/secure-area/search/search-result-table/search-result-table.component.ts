import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { IPageInfo } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Media } from 'src/app/model/media';
import { SelectionController } from 'src/app/selection.controller';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: [ './search-result-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTableComponent implements OnDestroy {

  private readonly destroyed = new Subject();
  results: ResultItem[] = [];
  isLoading = true;
  private allResultsLoaded = false;
  readonly selectionController = new SelectionController();
  selectedMedia: Media[] = []; // We store which media are selected instead of just their indices, so we can pass it to the media-manager component

  constructor(private readonly searchService: SearchService,
              private readonly cd: ChangeDetectorRef) {
    this.searchService.results().pipe(
      switchMap(x => x),
      takeUntil(this.destroyed)
    ).subscribe(results => {
      this.results = [];
      this.clearSelection();
      this.appendResults(results)
    });
  }

  public onViewportEnd(event: IPageInfo): void {
    const THRESHHOLD = 25;

    if (event.endIndex + THRESHHOLD > this.results.length && !this.isLoading && !this.allResultsLoaded) {

      this.isLoading = true;
      this.searchService.nextPage().pipe(
        takeUntil(this.destroyed) // fucken review
      ).subscribe(nextPage => this.appendResults(nextPage));
    }
  }

  private appendResults(results: Media[]): void {
    if (results.length < SearchService.CHUNK_SIZE) {
      this.allResultsLoaded = true;
    }

    const maxIndex = this.results.length;
    this.results = this.results.concat(results.map((v, i) => new ResultItem(maxIndex + i, v)));
    this.isLoading = false;
    this.cd.markForCheck();
  }

  // FIXME: This is whole method is pre dodge, probably worth while *trying* to clean up once this feature works
  public onClick(index: number, event: MouseEvent): void {
    event.preventDefault();

    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      // console.log('onClick');
      this.selectionController.onClick(index);
    } else if (event.shiftKey) {
      // console.log('onShiftClick');
      this.selectionController.onShiftClick(index);
    } else if (event.ctrlKey) {
      // console.log('onControlClick');
      this.selectionController.onControlClick(index);
    } else {
      return; // Meaningless
    }

    this.cd.markForCheck();

    if (this.selectionController.size() === 0) {
      this.selectedMedia = [];
      this.cd.markForCheck();
      return;
    }

    this.selectedMedia = Array.from(this.selectionController.indices()).map(i => this.results[i].media);

  }

  clearSelection(): void {
    this.selectionController.clear();
    this.selectedMedia = [];
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

class ResultItem {
  constructor(public readonly index: number,
              public readonly media: Media) {
  }
}

