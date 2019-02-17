import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSliderComponent } from './product-details-slider.component';

describe('ProductDetailsSliderComponent', () => {
  let component: ProductDetailsSliderComponent;
  let fixture: ComponentFixture<ProductDetailsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
