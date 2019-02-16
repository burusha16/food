import {Route} from '@angular/router';
import {MainPageComponent} from './main-page.component';
import {HeaderPromoComponent} from '../../header/header-promo/header-promo.component';
import {FooterMenuComponent} from '../../footer/footer-menu/footer-menu.component';

export const MainPageRoute: Route = {
  path: '',
  children: [
    {
      path: '',
      component: MainPageComponent,
    },
    {
      path: '',
      component: HeaderPromoComponent,
      outlet: 'headerPromo'
    },
    {
      path: '',
      component: FooterMenuComponent,
      outlet: 'footerMenu'
    }
  ]
};
