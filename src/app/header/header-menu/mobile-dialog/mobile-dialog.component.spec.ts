import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuDialogComponent } from './mobile-dialog.component';

describe('MobileDialogComponent', () => {
  let component: HeaderMenuDialogComponent;
  let fixture: ComponentFixture<HeaderMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
