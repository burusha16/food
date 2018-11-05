import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseApiService } from '../shared/services/base-api.service';
import { IHeaderMenuItem } from '../shared/interfaces/HeaderMenuItem.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: IHeaderMenuItem[];

  constructor() {
  }

  ngOnInit() {
  }
}
