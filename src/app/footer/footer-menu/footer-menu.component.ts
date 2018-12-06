import {Component} from '@angular/core';
import {IFooterMenuItem} from '../../shared/interfaces/app-menu.interface';
import {BaseApiService} from '../../shared/services/base-api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent {
  menuItems$: Observable<IFooterMenuItem[]>;

  constructor(private apiService: BaseApiService) {
    this.menuItems$ = apiService.footerMenu$;
  }
}
