import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import { CookieService, CookieModule } from 'ngx-cookie';
import {TransferHttpCacheModule} from '@nguniversal/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './header/header.module';
import {MainPageModule} from './pages/main-page/main-page.module';
import {TranslatesService} from '@shared/modules/translates';
import {UniversalStorage} from '@shared/other/universal.storage';
import {SharedModule} from '@shared/modules/shared.module';
import {RouterModule} from '@angular/router';
import {FooterModule} from './footer/footer.module';

import {DeviceWindowService} from '@shared/services/device-window.service';
import {BaseApiService} from '@shared/services/base-api.service';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {CachingInterceptor, RequestCacheService} from '@shared/services/request-cache.service';
import {ContentPreloadService} from '@shared/services/content-preload.service';
import {AppService} from '@shared/services/base-app.service';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {SharedMetaModule} from '@shared/modules/shared-meta';
import {MenuService} from './pages/menu/menu.service';
import {ReactiveFormsModule} from '@angular/forms';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
];

export function initLanguage(translateService: TranslatesService): Function {
  return (): Promise<any> => translateService.initLanguage();
}

export function getOffers(apiService: BaseApiService): Function {
  return (): Promise<any> => apiService.offers$.toPromise();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HeaderModule,
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabled'
    }),
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    SharedModule.forRoot(),
    TranslateModule,
    MainPageModule,
    FooterModule,
    SharedMetaModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    UniversalStorage,
    { provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [TranslatesService] },
    { provide: APP_INITIALIZER, useFactory: getOffers, multi: true, deps: [BaseApiService] },
    httpInterceptorProviders,
    RequestCacheService,
    BaseApiService,
    AppService,
    DeviceWindowService,
    WindowScrollService,
    ContentPreloadService,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
