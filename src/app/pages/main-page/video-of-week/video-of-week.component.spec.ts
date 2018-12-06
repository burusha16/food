import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOfWeekComponent } from './video-of-week.component';

describe('VideoOfWeekComponent', () => {
  let component: VideoOfWeekComponent;
  let fixture: ComponentFixture<VideoOfWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoOfWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
