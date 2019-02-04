import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-mobile-app',
  templateUrl: './mobile-app.component.html',
  styleUrls: ['./mobile-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileAppComponent {
}
