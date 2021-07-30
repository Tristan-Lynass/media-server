import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent {

  lastTarget = null; // https://stackoverflow.com/a/28226022/3616885
  dropped = false;

  @HostListener('window:dragenter', ['$event'])
  private onDragEnter(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.lastTarget = e.target;

    console.log('Drag Enter');
    // TODO: open overlay with prompt image
  }

  @HostListener('window:dragleave', ['$event'])
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
  @HostListener('window:dragover', ['$event'])
  private onDragOver(e: DragEvent): void {
    e.preventDefault();
  }

  @HostListener('drop', ['$event'])
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
  }

}
