import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

export function setTestsLangs(translateService: TranslateService): Function {
  return () => {
    translateService.addLangs(['ru']);
    translateService.setDefaultLang('ru');
    moment.locale('ru');
    return translateService.use('ru').toPromise();
  };
}
