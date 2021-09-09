import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MediaService } from 'src/app/service/media.service';
import { Media } from 'src/app/service/search.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: [ './manage-media.component.scss' ]
})
export class ManageMediaComponent implements OnInit {

  readonly media: Media;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: any,
              readonly bottomSheetRef: MatBottomSheetRef<ManageMediaComponent>,
              private readonly mediaService: MediaService) {
    this.media = data.media;
  }

  ngOnInit(): void {
  }

  add(tag: string): void {
    this.media.tags.add(tag);
    this.mediaService.addTag(this.media, tag);
  }

  remove(tag: string): void {
    this.media.tags.delete(tag);
    this.mediaService.removeTag(this.media, tag);
  }
}
