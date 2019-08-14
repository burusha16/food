import {ChangeDetectionStrategy, Component, Inject, Injector, PLATFORM_ID} from '@angular/core';
import {ServiceLocator} from '@shared/services/locator.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private injector: Injector,
              private translate: TranslateService,
              @Inject(PLATFORM_ID) private platformId: string) {
    ServiceLocator.injector = this.injector;
    ServiceLocator.platformId = this.platformId;
  }
}
