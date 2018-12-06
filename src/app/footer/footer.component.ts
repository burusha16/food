import {Observable} from 'rxjs';
import {Component} from '@angular/core';
import {Responsive} from '../shared/decorators/responsive.decorator';
import {IFooterMenuItem} from '../shared/interfaces/app-menu.interface';
import {BaseApiService} from '../shared/services/base-api.service';
import {IResponsiveComponent} from '../shared/interfaces/responsive-component.interface';

@Responsive()
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements IResponsiveComponent {
  isMobile: boolean;
  isSmall: boolean;
  socialItems$: Observable<IFooterMenuItem[]>;

  constructor(private apiService: BaseApiService) {
    this.socialItems$ = apiService.footerSocial$;
  }
}
