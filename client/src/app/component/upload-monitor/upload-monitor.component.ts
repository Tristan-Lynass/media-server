import { Component, OnInit } from '@angular/core';
import { SequentialUploadService } from 'src/app/service/sequential-upload.service';
import { UploadProgress } from 'src/app/upload-progress';

@Component({
  selector: 'app-upload-monitor',
  templateUrl: './upload-monitor.component.html',
  styleUrls: [ './upload-monitor.component.scss' ]
})
export class UploadMonitorComponent implements OnInit {

  public readonly trackByIdentity = (index: number, item: UploadProgress): string => item.id;

  constructor(readonly uploadService: SequentialUploadService) {
  }

  ngOnInit(): void {
  }

  isFinished(progress: UploadProgress): boolean {
    return progress.isFinished;
  }

}
