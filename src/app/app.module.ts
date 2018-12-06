import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { MainPageModule } from './main-page/main-page.module';
import { RouterModule } from '@angular/router';
import {FooterModule} from './footer/footer.module';

import { DeviceWindowService } from './shared/services/device-window.service';
import { BaseApiService } from './shared/services/base-api.service';
import { WindowScrollService } from './shared/services/window-scroll.service';
import { CachingInterceptor, RequestCacheService } from './shared/services/request-cache.service';
import {ContentPreloadService} from './shared/services/content-preload.service';
import { AppService } from './shared/services/base-app.service';

import { AppComponent } from './app.component';
import { MyMissingTranslationHandler } from './shared/other/translate.handler';

import { AppRoutes } from './app.routing';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      useDefaultLang: false
    }),
    HeaderModule,
    MainPageModule,
    FooterModule
  ],
  providers: [
    httpInterceptorProviders,
    RequestCacheService,
    BaseApiService,
    AppService,
    DeviceWindowService,
    WindowScrollService,
    ContentPreloadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
