import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConstructorComponent } from './menu-constructor.component';

describe('MenuConstructorComponent', () => {
  let component: MenuConstructorComponent;
  let fixture: ComponentFixture<MenuConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
