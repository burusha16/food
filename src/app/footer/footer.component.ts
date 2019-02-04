import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {IFooterMenuItem} from '@shared/interfaces/app-menu.interface';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {AppService} from '@shared/services/base-app.service';

@Responsive()
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, IResponsiveComponent {
  isMobile: boolean;
  isSmall: boolean;
  socialItems: IFooterMenuItem[] = this.appService.footerSocialList;

  constructor(private appService: AppService) {}

  ngOnInit() {
  }
}
