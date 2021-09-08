import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: [ './tag-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagManagerComponent {

  input: string;

  readonly tags: Set<string> = new Set<string>();

  constructor(private readonly cd: ChangeDetectorRef) { }

  addTag(): void {
    const input = this.input.trim();
    if (input === '') {
      return;
    }

    this.tags.add(input);
    this.input = '';

    // TODO: update service so that it can re-fetch cache data stuff
    //
    this.cd.markForCheck();
  }

  deleteTag(tag: string): void {
    this.tags.delete(tag);
    this.cd.markForCheck();
  }

}
