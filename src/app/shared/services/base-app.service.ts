import {Observable, Subscription} from 'rxjs';
import { Injectable } from '@angular/core';
import {IAppConfig, ISliderMenuExamplesConfig} from '../interfaces/app-config-response.interface';
import {ISmiItem} from '../interfaces/smi-list-item.iterface';

@Injectable()
export class AppService {
  actualWeekKey: string;
  private _sliderMenuExamplesConfig: ISliderMenuExamplesConfig;
  private _smiList: ISmiItem[];

  constructor() {
  }

  get sliderMenuExamplesConfig(): ISliderMenuExamplesConfig {
    return this._sliderMenuExamplesConfig;
  }

  get smiList(): ISmiItem[] {
    return this._smiList;
  }

  init(config$: Observable<IAppConfig>) {
    const subscription: Subscription = config$.subscribe((data: IAppConfig) => {
      this._sliderMenuExamplesConfig = data.sliderMenuExamplesConfig;
      this._smiList = data.smiList;
      subscription.unsubscribe();
    });
  }
}
