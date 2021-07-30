import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UiScrollModule } from 'ngx-ui-scroll';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { AppComponent } from 'src/app/component/app.component';
import { ResultItemComponent } from 'src/app/component/result-item/result-item.component';
import { SearchBarComponent } from 'src/app/component/search-bar/search-bar.component';
import { SearchTagComponent } from 'src/app/component/search-bar/search-tag/search-tag.component';
import { SearchResultTableComponent } from 'src/app/component/search-result-table/search-result-table.component';
import { SearchResultsComponent } from 'src/app/component/search-results/search-results.component';

import { AppRoutingModule } from './app-routing.module';
import { FileDropZoneComponent } from './component/file-drop-zone/file-drop-zone.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SearchResultTableComponent,
    ResultItemComponent,
    SearchTagComponent,
    FileDropZoneComponent
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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
