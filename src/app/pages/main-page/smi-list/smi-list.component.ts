import { Component } from '@angular/core';
import {AppService} from '../../../shared/services/base-app.service';
import {ISmiItem} from '../../../shared/interfaces/smi-list-item.iterface';

@Component({
  selector: 'app-smi-list',
  templateUrl: './smi-list.component.html',
  styleUrls: ['./smi-list.component.scss']
})
export class SmiListComponent {
  smiList: ISmiItem[];

  constructor(private appService: AppService) {
    this.smiList = this.appService.smiList;
  }
}
