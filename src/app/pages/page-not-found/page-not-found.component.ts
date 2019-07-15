import { Component } from '@angular/core';
import {IPageNotFoundReleasedPage} from './shared/page-not-found-released-page.interfaces';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  releasedPages: IPageNotFoundReleasedPage[] = [
    {
      href: '',
      name: 'главня'
    },
    {
      href: 'menu',
      name: 'меню'
    }
  ];
}
