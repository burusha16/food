import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "./material.module";
import { PipesModule } from "./pipes.module";

@NgModule({
  exports: [
      CommonModule,
      TranslateModule,
      MaterialModule,
      PipesModule
  ]
})
export class SharedModule {
}