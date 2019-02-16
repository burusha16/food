import {Injectable} from '@angular/core';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {MatSidenav} from '@angular/material';

@Injectable()
export class MenuSidenavService {
  sidenav: MatSidenav;

  constructor(private scrollService: WindowScrollService) {
  }

  showSidenav() {
    this.sidenav.open();
    this.scrollService.disableWindowScroll();
  }

  hideSidenav() {
    this.sidenav.close();
    this.scrollService.enableWindowScroll();
  }
}
