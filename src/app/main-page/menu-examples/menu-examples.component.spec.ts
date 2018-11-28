/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuExamplesComponent } from './menu-examples.component';

describe('MenuExamplesComponent', () => {
  let component: MenuExamplesComponent;
  let fixture: ComponentFixture<MenuExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
