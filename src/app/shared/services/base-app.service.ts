import { Injectable } from '@angular/core';
import {BaseApiService} from './base-api.service';
import {IAppConfig, ISliderMenuExamplesConfig} from '../interfaces/app-config-response.interface';

@Injectable()
export class AppService {
  private _sliderMenuExamplesConfig: ISliderMenuExamplesConfig;
  private _actualWeekKey: string;

  constructor() {
  }

  get actualWeekKey(): string {
    return this._actualWeekKey;
  }

  get sliderMenuExamplesConfig(): ISliderMenuExamplesConfig {
    return this._sliderMenuExamplesConfig;
  }

  set actualWeekKey(key: string) {
    this._actualWeekKey = key;
  }

  set sliderMenuExamplesConfig(config: ISliderMenuExamplesConfig) {
    this._sliderMenuExamplesConfig = config;
  }
}
