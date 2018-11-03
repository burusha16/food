import { Component, Injector } from '@angular/core';
import { Responsive } from './shared/responsive.decorator';
import { IResponsiveComponent } from './shared/interfaces/ResponsiveComponent.interface';
import { ServiceLocator } from './shared/locator.service';

@Responsive()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements IResponsiveComponent {
  isDesktopLG: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;

  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
