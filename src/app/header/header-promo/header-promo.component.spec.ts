import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPromoComponent } from './header-promo.component';

describe('HeaderPromoComponent', () => {
  let component: HeaderPromoComponent;
  let fixture: ComponentFixture<HeaderPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
