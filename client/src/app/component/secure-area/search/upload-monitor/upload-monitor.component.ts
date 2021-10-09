import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/service/upload.service';
import { UploadProgress } from 'src/app/upload-progress';

@Component({
  selector: 'app-upload-monitor',
  templateUrl: './upload-monitor.component.html',
  styleUrls: [ './upload-monitor.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadMonitorComponent implements OnInit {

  public readonly trackByIdentity = (index: number, item: UploadProgress): string => item.id;

  constructor(readonly uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  isFinished(progress: UploadProgress): boolean {
    return progress.isFinished;
  }

}
