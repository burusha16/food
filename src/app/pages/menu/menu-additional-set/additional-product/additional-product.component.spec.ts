import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalProductComponent } from './additional-product.component';

describe('AdditionalProductComponent', () => {
  let component: AdditionalProductComponent;
  let fixture: ComponentFixture<AdditionalProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
