import {BaseApiService} from '@shared/services/base-api.service';
import {IOffer} from '@shared/interfaces/offers.interface';

export function getOffers(apiService: BaseApiService): Function {
  return (): Promise<IOffer[]> => apiService.offers$.toPromise();
}
