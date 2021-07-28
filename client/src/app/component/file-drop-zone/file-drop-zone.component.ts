import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent {

  lastTarget = null; // https://stackoverflow.com/a/28226022/3616885

  @HostListener('window:dragenter', ['$event'])
  private onDragEnter(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.lastTarget = e.target;

    console.log('Drag Enter');
  }

  @HostListener('window:dragleave', ['$event'])
  private onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === this.lastTarget || e.target === document) {
      // console.log(e.target);
      // console.log('Drag Leave');
      this.lastTarget = null;
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
    console.log(files);
  }

}
