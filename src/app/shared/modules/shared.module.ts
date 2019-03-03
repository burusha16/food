import {ModuleWithProviders, NgModule} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PipesModule } from '../pipes/pipes.module';
import {TransferHttpModule} from '@gorniv/ngx-transfer-http';

@NgModule({
  exports: [
      CommonModule,
      TransferHttpModule,
      TranslateModule,
      MaterialModule,
      PipesModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
