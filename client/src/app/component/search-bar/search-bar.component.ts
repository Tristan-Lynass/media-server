import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  input: string;

  readonly tags: Set<string> = new Set<string>();

  constructor(private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addTag(): void {
    // console.log(tag);
    const input = this.input.trim();
    if (input === '') {
      return;
    }

    this.tags.add(input);
    this.input = '';

    // TODO: update service so that it can re-fetch cache data stuff
    this.cd.markForCheck();
  }

  deleteTag(tag: string): void {
    this.tags.delete(tag);
  }


}
