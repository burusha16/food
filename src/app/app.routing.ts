import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuModule'
  }
];
