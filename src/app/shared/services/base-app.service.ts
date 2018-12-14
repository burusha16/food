import {Observable, Subscription} from 'rxjs';
import { Injectable } from '@angular/core';
import {IAppConfig, ISliderMenuExamplesConfig} from '../interfaces/app-config-response.interface';
import {ISmiItem} from '../interfaces/smi-list-item.iterface';
import {SliderMenuExamplesConfig, SmiList} from '@shared/other/app.config';

@Injectable()
export class AppService {
  actualWeekKey: string;
  private _sliderMenuExamplesConfig: ISliderMenuExamplesConfig;
  private _smiList: ISmiItem[];

  constructor() {
    this._sliderMenuExamplesConfig = {
      'personsAmount': 2,
      'defaultGoodsLength': 5,
      'tabsSortRule': [
        'Classic',
        'Premium',
        'Family',
        'Express',
        'Fitness',
        'Vegetarian'
      ]
    };
  }

  get sliderMenuExamplesConfig(): ISliderMenuExamplesConfig {
    return SliderMenuExamplesConfig;
  }

  get smiList(): ISmiItem[] {
    return SmiList;
  }
}
