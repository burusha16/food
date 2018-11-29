import * as moment from 'moment';
import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Responsive } from './shared/decorators/responsive.decorator';
import { ServiceLocator } from './shared/services/locator.service';
import { TranslateService } from '@ngx-translate/core';
import {IAppConfig} from './shared/interfaces/app-config-response.interface';
import {BaseApiService} from './shared/services/base-api.service';
import {AppService} from './shared/services/base-app.service';
@Responsive()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private injector: Injector,
              private translate: TranslateService,
              private apiService: BaseApiService,
              private appService: AppService) {
    ServiceLocator.injector = this.injector;
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('ru');
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/ru|en/) ? browserLang : 'ru');
    moment.locale(this.translate.currentLang);
    this.apiService.getAppConfig().subscribe((config: IAppConfig) => {
      this.appService.sliderMenuExamplesConfig = config.sliderMenuExamplesConfig;
    });
  }
}
