import {Routes} from '@angular/router';
import {MainPageRoute} from './pages/main-page/main-page.routing';
import {MenuRoute} from './pages/menu/menu.routing';
import {PageNotFoundComponent} from '@shared/components/page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  MainPageRoute,
  MenuRoute,
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
