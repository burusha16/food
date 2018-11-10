import { Routes } from '@angular/router';
import { HeaderPromoComponent } from './header-promo/header-promo.component';

export const HeaderRoutes: Routes = [
  { path: '', component: HeaderPromoComponent, outlet: 'promo' },
  { path: 'menu', component: HeaderPromoComponent, outlet: 'promo' }
];
