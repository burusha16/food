import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {MainPageResolver} from './main-page/main-page.resolver';


export const AppRoutes: Routes = [
  { path: '',
    component: MainPageComponent,
    resolve: {
      menuExamples: MainPageResolver
    }
  }
];
