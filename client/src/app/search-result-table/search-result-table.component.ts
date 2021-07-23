import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.scss']
})
export class SearchResultTableComponent   {
  items = new Array(100).fill('https://picsum.photos/300/300');

  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;

  // call this function after resize + animation end
  afterResize() {
    this.virtualScroller.refresh();
  }
}