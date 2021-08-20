import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/service/search.service';

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

  tags = [];

  private isLoading = true;

  constructor(private readonly searchService: SearchService,
              private readonly cd: ChangeDetectorRef) {
    this.isLoading = true;
    this.searchService.search(this.tags).pipe(
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.results = result;
      this.cd.markForCheck();
      this.isLoading = false;
    });
  }

  // call this function after resize + animation end
  // afterResize() {
  //   this.virtualScroller.refresh();
  // }

  public onVsEnd(event: any): void {
    const THRESHHOLD = 25;

    if (event.endIndex + THRESHHOLD > this.results.length && !this.isLoading) {

      this.isLoading = true;
      this.searchService.nextPage().pipe(
        takeUntil(this.destroyed) // fucken review
      ).subscribe(result => {
        this.results = this.results.concat(result);
        this.cd.markForCheck();
        this.isLoading = false;
      });
    }

  }

  ngOnDestroy(): void {
  }
}
