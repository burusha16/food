import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Responsive } from './shared/responsive.decorator';
import { ServiceLocator } from './shared/locator.service';

@Responsive()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
