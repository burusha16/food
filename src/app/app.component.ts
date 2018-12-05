import * as moment from 'moment';
import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { ServiceLocator } from './shared/services/locator.service';
import { TranslateService } from '@ngx-translate/core';
import {BaseApiService} from './shared/services/base-api.service';
import {AppService} from './shared/services/base-app.service';
import {IAppConfig} from './shared/interfaces/app-config-response.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  appConfig$: Observable<IAppConfig> = this.apiService.getAppConfig();

  constructor(private injector: Injector,
              private translate: TranslateService,
              private apiService: BaseApiService,
              private appService: AppService) {
    this.appService.init(this.appConfig$);
    ServiceLocator.injector = this.injector;
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('ru');
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/ru|en/) ? browserLang : 'ru');
    moment.locale(this.translate.currentLang);
  }
}
