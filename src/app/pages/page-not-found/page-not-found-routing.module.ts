import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found.component';

export const PageNotFoundRoute: Route = {
  path: '**',
  loadChildren: './pages/page-not-found/page-not-found.module#PageNotFoundModule'
};

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
