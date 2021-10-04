import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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
