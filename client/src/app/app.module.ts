import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFilesizeModule } from 'ngx-filesize';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UiScrollModule } from 'ngx-ui-scroll';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { AppComponent } from 'src/app/component/app.component';
import { MenuDrawerComponent } from 'src/app/component/secure-area/menu-drawer/menu-drawer.component';
import { FileDropZoneComponent } from 'src/app/component/secure-area/search/file-drop-zone/file-drop-zone.component';
import { ResultItemComponent } from 'src/app/component/secure-area/search/result-item/result-item.component';
import { SearchResultTableComponent } from 'src/app/component/secure-area/search/search-result-table/search-result-table.component';
import { SearchComponent } from 'src/app/component/secure-area/search/search.component';
import { ManageMediaComponent } from 'src/app/component/secure-area/search/tag-management-context-menu/manage-media.component';
import { SearchTagComponent } from 'src/app/component/secure-area/search/tag-manager/search-tag/search-tag.component';
import { TagManagerComponent } from 'src/app/component/secure-area/search/tag-manager/tag-manager.component';
import { UploadMonitorComponent } from 'src/app/component/secure-area/search/upload-monitor/upload-monitor.component';
import { TagsComponent } from 'src/app/component/secure-area/tags/tags.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './component/login/login.component';
import { SecureAreaComponent } from './component/secure-area/secure-area.component';

@NgModule({
  declarations: [
    AppComponent,
    TagManagerComponent,
    SearchResultTableComponent,
    ResultItemComponent,
    SearchTagComponent,
    FileDropZoneComponent,
    UploadMonitorComponent,
    ManageMediaComponent,
    MenuDrawerComponent,
    SearchComponent,
    TagsComponent,
    LoginComponent,
    SecureAreaComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
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
    NgxFilesizeModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
