import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTableComponent implements OnDestroy  {
  // items = new Array(100).fill('https://picsum.photos/200/200');

  // @ViewChild(VirtualScrollerComponent)
  // private virtualScroller: VirtualScrollerComponent;

  private readonly destroyed = new Subject();

  results = [];

  constructor(readonly searchService: SearchService, cd: ChangeDetectorRef) {
    this.searchService.findAll().pipe(
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.results = result;
      cd.markForCheck();
    });
  }

  // call this function after resize + animation end
  // afterResize() {
  //   this.virtualScroller.refresh();
  // }

  xxx(event): void {
    console.log(event);
  }

  ngOnDestroy(): void {
  }
}
