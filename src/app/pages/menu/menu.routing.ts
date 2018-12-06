import {Route, Routes} from '@angular/router';
import {MenuResolver} from './menu.resolver';
import {MenuComponent} from './menu.component';
import {HeaderPromoComponent} from '../../header/header-promo/header-promo.component';

export const MenuModuleRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
    resolve: {
      offers: MenuResolver
    }
  }
];

export const MenuRoute: Route = {
  path: 'menu',
  children: [
    {
      path: '',
      loadChildren: './pages/menu/menu.module#MenuModule'
    },
    {
      path: '',
      component: HeaderPromoComponent,
      outlet: 'headerPromo'
    }
  ]
};
