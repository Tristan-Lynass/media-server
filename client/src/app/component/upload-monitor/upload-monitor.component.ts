import { Component, OnInit } from '@angular/core';
import { SequentialUploadService } from 'src/app/service/sequential-upload.service';

@Component({
  selector: 'app-upload-monitor',
  templateUrl: './upload-monitor.component.html',
  styleUrls: ['./upload-monitor.component.scss']
})
export class UploadMonitorComponent implements OnInit {

  constructor(readonly xx: SequentialUploadService) { }

  ngOnInit(): void {
  }

}
