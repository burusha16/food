import {ModuleWithProviders, NgModule} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PipesModule } from './pipes.module';
import {SharedMetaModule} from '@shared/modules/shared-meta';
import {TransferHttpModule} from '@gorniv/ngx-transfer-http';

@NgModule({
  exports: [
      CommonModule,
      SharedMetaModule,
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
