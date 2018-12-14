import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AppModule} from './app.module';
import {TranslatesServerModule} from '@shared/modules/translates/translates-server';

import {AppComponent} from './app.component';
import {CookieBackendService, CookieService} from 'ngx-cookie';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    TranslatesServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: CookieService, useClass: CookieBackendService },
  ],
})
export class AppServerModule {
}
