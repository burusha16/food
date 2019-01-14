import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdditionalSetComponent } from './menu-additional-set.component';

describe('MenuAdditionalSetComponent', () => {
  let component: MenuAdditionalSetComponent;
  let fixture: ComponentFixture<MenuAdditionalSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAdditionalSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdditionalSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
