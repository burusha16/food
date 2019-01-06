import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDefaultSetComponent } from './menu-default-set.component';

describe('MenuDefaultSetComponent', () => {
  let component: MenuDefaultSetComponent;
  let fixture: ComponentFixture<MenuDefaultSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDefaultSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDefaultSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
