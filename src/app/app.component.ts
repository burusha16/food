import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Responsive } from './shared/decorators/responsive.decorator';
import { ServiceLocator } from './shared/services/locator.service';
import { TranslateService } from '@ngx-translate/core';
@Responsive()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private injector: Injector,
              private translate: TranslateService) {
    ServiceLocator.injector = this.injector;
    this.translate.setDefaultLang('ru');
  }
}
