import {Routes} from '@angular/router';
import {MainPageComponent} from './main-page.component';
import {MainPageResolver} from './main-page.resolver';

export const MainPageRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    resolve: {
      menuExamples: MainPageResolver
    }
  }
];
