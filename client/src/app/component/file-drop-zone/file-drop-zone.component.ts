import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { SequentialUploadService } from 'src/app/service/sequential-upload.service';

/**
 * TODO: Investigate using CDK overlay and clean up...
 */
@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: [ './file-drop-zone.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropZoneComponent implements OnDestroy {

  lastTarget = null; // https://stackoverflow.com/a/28226022/3616885
  dropped = false;

  // So we don't capture when the user drags DOM elements
  // Stolen from: https://github.com/georgipeltekov/ngx-file-drop/blob/master/src/ngx-file-drop/ngx-file-drop.component.ts
  private isDomDragHappening = false;
  private readonly removeDragStartListener: () => void;
  private readonly removeDragEndListener: () => void;

  constructor(private readonly us: SequentialUploadService,
              renderer: Renderer2) {
    // These must be done with Renderer2, not HostListener
    this.removeDragStartListener = renderer.listen('document', 'dragstart', () => {
      this.isDomDragHappening = true;
    });
    this.removeDragEndListener = renderer.listen('document', 'dragend', () => {
      this.isDomDragHappening = false;
    });
  }

  @HostListener('window:dragenter', [ '$event' ])
  private onDragEnter(e: DragEvent): void {
    if (this.isDomDragHappening) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    this.lastTarget = e.target;

    console.log('Drag Enter');
    console.log(e);
    // TODO: open overlay with prompt image
  }

  @HostListener('window:dragleave', [ '$event' ])
  private onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === this.lastTarget || e.target === document) {

      this.lastTarget = null;
      // TODO: close overlay
    }
  }

  // Needed so that the drop event will fire
  /* https://stackoverflow.com/a/60565791/3616885 */
  @HostListener('window:dragover', [ '$event' ])
  private onDragOver(e: DragEvent): void {
    e.preventDefault();
  }

  @HostListener('drop', [ '$event' ])
  private onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files == null || files.length === 0) {
      this.lastTarget = null;
    }
    this.dropped = true;
    // if (any files validate)
    //   TODO: Change the displayed dialog to the pre-upload dialog
    //    Then from that dialog, you can close to cancel or hit upload / (enter) to start upload
    // else
    //   TODO: turn red
    console.log(files);
    this.us.uploadAll(Array.from(files));
    this.lastTarget = null;
  }

  ngOnDestroy(): void {
    this.removeDragStartListener();
    this.removeDragEndListener();
  }

}
