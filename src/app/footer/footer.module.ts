import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/modules/shared.module';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer.component';
import {FooterMenuComponent} from './footer-menu/footer-menu.component';

@NgModule({
  declarations: [
    FooterComponent,
    FooterMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    FooterComponent,
    FooterMenuComponent
  ]
})
export class FooterModule { }
