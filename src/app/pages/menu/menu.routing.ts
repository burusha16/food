import {Routes} from '@angular/router';
import {MenuResolver} from './menu.resolver';
import {MenuComponent} from './menu.component';

export const MenuModuleRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
    resolve: {
      offers: MenuResolver
    }
  }
];
