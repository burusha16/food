import {Route, Routes} from '@angular/router';
import {MenuResolver} from './menu.resolver';
import {MenuComponent} from './menu.component';
import {HeaderPromoComponent} from '../../header/header-promo/header-promo.component';
import {FooterMenuComponent} from '../../footer/footer-menu/footer-menu.component';

export const MenuModuleRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'classic',
        pathMatch: 'full'
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
      },
      {
        path: ':class',
        component: MenuComponent,
        resolve: {
          offers: MenuResolver
        }
      }
    ]
  }
];

export const MenuRoute: Route = {
  path: 'menu',
  loadChildren: './pages/menu/menu.module#MenuModule'
};
