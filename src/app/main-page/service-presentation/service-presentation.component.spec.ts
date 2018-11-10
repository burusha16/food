import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePresentationComponent } from './service-presentation.component';

describe('ServicePresentationComponent', () => {
  let component: ServicePresentationComponent;
  let fixture: ComponentFixture<ServicePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
