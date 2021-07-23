import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { IDatasource } from 'ngx-ui-scroll';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: [ './search-results.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnDestroy {

  private curr = 0;
  private step = 200;

  items: IDatasource<string> = {
    get: (index, count, success): void => {
      console.log(index, count);
      if (index < 0) {
        return success([]);
      }

      const data = [];
      for (let i = index; i <= index + count - 1; i++) {
        data.push({ text: 'item #' + i });
      }
      success(data);
    },
    settings: {
      bufferSize: 50
    }
  };

  private readonly destroyed = new Subject<void>();

  // constructor(private readonly cd: ChangeDetectorRef,
  //             sd: ScrollDispatcher) {
  //   this.nextItems();
  //   sd.scrolled(100).pipe(
  //     takeUntil(this.destroyed)
  //   ).subscribe((cs: CdkScrollable) => {
  //
  //     const contentHeight = cs.getElementRef().nativeElement.scrollHeight;
  //     const scrolledUntilNow = cs.measureScrollOffset('bottom');
  //     const scrolledPercent = scrolledUntilNow / contentHeight;
  //     const loadThreshold = 0.2;
  //     if (scrolledPercent <= loadThreshold) {
  //       this.nextItems();
  //     }
  //   });
  // }


  // public nextItems(): void {
  //   const extra = [];
  //   for (let i = this.curr; i < this.curr + this.step; i++) {
  //     extra.push(`Item #${i}`);
  //   }
  //   this.items = [...this.items, ...extra];
  //   this.curr += this.step;
  //   this.cd.markForCheck();
  // }

  ngOnDestroy(): void {
    this.destroyed.complete();
  }

}
