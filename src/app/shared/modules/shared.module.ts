import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";

@NgModule({
  exports: [
      CommonModule,
      TranslateModule,
      MaterialModule
  ]
})
export class SharedModule {
}