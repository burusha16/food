import {Routes} from '@angular/router';
import {MainPageRoute} from './pages/main-page/main-page.routing';
import {MenuRoute} from './pages/menu/menu.routing';
import {PageNotFoundRoute} from './pages/page-not-found/page-not-found-routing.module';

export const AppRoutes: Routes = [
  MainPageRoute,
  MenuRoute,
  PageNotFoundRoute
];
