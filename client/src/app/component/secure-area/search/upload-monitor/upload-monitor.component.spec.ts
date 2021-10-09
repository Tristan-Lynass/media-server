import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMonitorComponent } from './upload-monitor.component';

describe('UploadMonitorComponent', () => {
  let component: UploadMonitorComponent;
  let fixture: ComponentFixture<UploadMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
