import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFilesizeModule } from 'ngx-filesize';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UiScrollModule } from 'ngx-ui-scroll';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { AppComponent } from 'src/app/component/app.component';
import { ResultItemComponent } from 'src/app/component/result-item/result-item.component';
import { SearchResultTableComponent } from 'src/app/component/search-result-table/search-result-table.component';
import { ManageMediaComponent } from 'src/app/component/tag-management-context-menu/manage-media.component';
import { SearchTagComponent } from 'src/app/component/tag-manager/search-tag/search-tag.component';
import { TagManagerComponent } from 'src/app/component/tag-manager/tag-manager.component';

import { AppRoutingModule } from './app-routing.module';
import { FileDropZoneComponent } from './component/file-drop-zone/file-drop-zone.component';
import { UploadMonitorComponent } from './component/upload-monitor/upload-monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    TagManagerComponent,
    SearchResultTableComponent,
    ResultItemComponent,
    SearchTagComponent,
    FileDropZoneComponent,
    UploadMonitorComponent,
    ManageMediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
    ScrollingModule,
    UiScrollModule,
    VirtualScrollerModule,
    FormsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressBarModule,
    HttpClientModule,
    MatDialogModule,
    MatBottomSheetModule,
    NgxFilesizeModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
