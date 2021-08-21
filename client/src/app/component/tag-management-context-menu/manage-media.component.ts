import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Media } from 'src/app/service/search.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: [ './manage-media.component.scss' ]
})
export class ManageMediaComponent implements OnInit {

  media: Media;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.media = data.media;
  }

  ngOnInit(): void {
  }

}
