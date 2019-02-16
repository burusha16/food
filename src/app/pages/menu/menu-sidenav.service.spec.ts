import { TestBed } from '@angular/core/testing';

import { MenuSidenavService } from './menu-sidenav.service';

describe('MenuSidenavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuSidenavService = TestBed.get(MenuSidenavService);
    expect(service).toBeTruthy();
  });
});
