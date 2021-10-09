import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input()
  drawer: MatDrawer;

  readonly startWith = new Set<string>();

  constructor(private readonly searchService: SearchService) {
    this.searchService.setTags(this.startWith);
  }

  add(tag: string): void {
    this.startWith.add(tag);
    this.searchService.setTags(this.startWith);
  }

  delete(tag: string): void {
    this.startWith.delete(tag);
    this.searchService.setTags(this.startWith);
  }
}
