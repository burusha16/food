import {Component} from '@angular/core';
import {AppService} from '@shared/services/base-app.service';
import {IFooterMenuItem} from '@shared/interfaces/app-menu.interface';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent {
  menuItems: IFooterMenuItem[] = this.appService.footerMenu;

  constructor(private appService: AppService) {
  }
}
