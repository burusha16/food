import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {CookieModule, CookieService} from 'ngx-cookie';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './header/header.module';
import {TranslatesService} from '@shared/modules/translates';
import {UniversalStorage} from '@shared/other/universal.storage';
import {SharedModule} from '@shared/modules/shared.module';
import {RouterModule} from '@angular/router';
import {FooterModule} from './footer/footer.module';
import {BaseApiService} from '@shared/services/base-api.service';
import {CachingInterceptor} from '@shared/services/request-cache.service';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {SharedMetaModule} from '@shared/modules/shared-meta';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '@shared/components/shared-components.module';
import {initAppLanguage} from '@shared/utils/module-factories/init-app-lang.factory';
import {getOffers} from '@shared/utils/module-factories/get-offers.factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    HeaderModule,
    FooterModule,
    SharedMetaModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
    CookieService,
    UniversalStorage,
    TranslatesService,
    { provide: APP_INITIALIZER, useFactory: initAppLanguage, multi: true, deps: [TranslatesService] },
    { provide: APP_INITIALIZER, useFactory: getOffers, multi: true, deps: [BaseApiService] },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
