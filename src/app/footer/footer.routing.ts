import {Routes} from '@angular/router';
import {FooterMenuComponent} from './footer-menu/footer-menu.component';

export const FooterRoutes: Routes = [
  { path: '', component: FooterMenuComponent, outlet: 'menu' },
];
