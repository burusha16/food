import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {IOffer} from '../../shared/interfaces/offers.interface';
import {BaseApiService} from '../../shared/services/base-api.service';

@Injectable()
export class MenuResolver implements Resolve<Observable<IOffer[]>> {
  constructor(private apiService: BaseApiService) {
  }

  resolve(): Observable<IOffer[]> {
    return this.apiService.offers$;
  }
}
