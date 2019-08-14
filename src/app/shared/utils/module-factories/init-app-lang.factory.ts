import {TranslatesService} from '@shared/modules/translates';
import * as moment from 'moment';

export function initAppLanguage(translateService: TranslatesService): Function {
  return (): Promise<any> => {
    return translateService.initLanguage()
      .then(() => {
        moment.locale(translateService.getCurrentLang());
      });
  };
}
