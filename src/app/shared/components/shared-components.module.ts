import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import {SharedModule} from '@shared/modules/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    TabsComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TabsComponent
  ]
})
export class SharedComponentsModule { }
