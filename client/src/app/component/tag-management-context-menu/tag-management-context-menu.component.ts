import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Media } from 'src/app/service/search.service';

@Component({
  selector: 'app-tag-management-context-menu',
  templateUrl: './tag-management-context-menu.component.html',
  styleUrls: [ './tag-management-context-menu.component.scss' ]
})
export class TagManagementContextMenuComponent implements OnInit {

  media: Media;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.media = data.media;
  }

  ngOnInit(): void {
  }

}
