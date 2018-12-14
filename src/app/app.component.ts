import * as moment from 'moment';
import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {ServiceLocator} from './shared/services/locator.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private injector: Injector,
              private translate: TranslateService) {
    ServiceLocator.injector = this.injector;
    // this.translate.addLangs(['ru', 'en']);
    // this.translate.setDefaultLang('ru');
    // const browserLang = translate.getBrowserLang();
    // this.translate.use(browserLang.match(/ru|en/) ? browserLang : 'ru');
    moment.locale(this.translate.currentLang);
  }
}
