import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmiListComponent } from './smi-list.component';

describe('SmiListComponent', () => {
  let component: SmiListComponent;
  let fixture: ComponentFixture<SmiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
