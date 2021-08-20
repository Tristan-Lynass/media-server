import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchBarComponent } from 'src/app/component/search-bar/search-bar.component';
import { TagManagementContextMenuComponent } from 'src/app/component/tag-management-context-menu/tag-management-context-menu.component';
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

  tags = [];

  private isLoading = true;

  constructor(private readonly searchService: SearchService,
              private readonly cd: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
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

  // TODO: Investigate if performance hit from getting HTMLElement ref this way
  public onRightClick(media: Media, event: MouseEvent): void {
    event.preventDefault();
    // const x = image.getBoundingClientRect();
    // console.log(x);
    this.dialog.open(TagManagementContextMenuComponent, {
      width: '70%',
      maxWidth: '1200px',
      height: '80%',
      maxHeight: '800px',
      data: {
        media
      }
      // position: {
      //   top: `${x.top + x.height}px`,
      //   left: `${x.left   }px`
      // }
    });
    // event.target; // spawn a dialog on this, and account for re-size
  }

  ngOnDestroy(): void {
    this.destroyed.complete();
  }
}
