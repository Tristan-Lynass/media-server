import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * TODO: Tweak behaviour of this component when it comes to tag input
 */
@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: [ './tag-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagManagerComponent implements OnInit {

  /**
   * Fires when a tag has been added. Emits the actual tag which was added.
   */
  @Output() added: EventEmitter<string> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  @Input() startWith: Set<string>;

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
    this.added.emit(input);
    this.cd.markForCheck();
  }

  deleteTag(tag: string): void {
    this.tags.delete(tag);
    this.deleted.emit(tag);
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    this.startWith.forEach(tag => this.tags.add(tag));
  }

}
