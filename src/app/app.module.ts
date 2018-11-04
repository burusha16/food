import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MissingTranslationHandler} from '@ngx-translate/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DeviceWindowService } from './shared/services/device-window.service';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { MyMissingTranslationHandler } from './shared/other/translate-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      useDefaultLang: false
    }),
    HeaderModule
  ],
  providers: [DeviceWindowService],
  bootstrap: [AppComponent]
})
export class AppModule {
  contsructor() {
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}