import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Responsive } from './shared/decorators/responsive.decorator';
import { ServiceLocator } from './shared/services/locator.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
@Responsive()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private injector: Injector,
              private translate: TranslateService,
              private http: HttpClient) {
    ServiceLocator.injector = this.injector;
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('ru');
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/ru|en/) ? browserLang : 'ru');
  }
}
