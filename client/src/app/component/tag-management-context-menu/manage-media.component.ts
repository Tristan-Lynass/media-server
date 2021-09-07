import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Media } from 'src/app/service/search.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: [ './manage-media.component.scss' ]
})
export class ManageMediaComponent implements OnInit {

  readonly media: Media;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: any,
              readonly bottomSheetRef: MatBottomSheetRef<ManageMediaComponent>) {
    this.media = data.media;
  }

  ngOnInit(): void {
  }

}
