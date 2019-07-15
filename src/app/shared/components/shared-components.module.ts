import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs/tabs.component';
import {SharedModule} from '@shared/modules/shared.module';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TabsComponent
  ]
})
export class SharedComponentsModule {
}
