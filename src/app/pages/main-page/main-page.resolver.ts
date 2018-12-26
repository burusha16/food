import * as _ from 'lodash/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {IOffer} from '@shared/interfaces/offers.interface';
import {IProduct} from '@shared/interfaces/product.interface';
import {BaseApiService} from '@shared/services/base-api.service';
import {AppService} from '@shared/services/base-app.service';
import {IMenuTabsConfig} from '@shared/interfaces/app-config.interface';
import {ProductType} from '@shared/enums/productType.enum';

@Injectable()
export class MainPageResolver implements Resolve<Observable<IProduct[]>> {
  constructor(private apiService: BaseApiService,
              private appService: AppService) {}

  get activeWeekKey(): string {
    return this.appService.actualWeekKey;
  }

  get menuTabsConfig(): IMenuTabsConfig {
    return this.appService.menuTabsConfig;
  }

  resolve(): Observable<IProduct[]> {
    return this.apiService.offers$
      .pipe(
        map((offers: IOffer[]) => {
          let products: IProduct[];
          const sortedProducts: IProduct[] = [];
          _.each(offers, (offer: IOffer) => {
            if (offer.weekKey === this.activeWeekKey) {
              products = _.filter(offer.products, ((product: IProduct) => {
                const personsAmountValid = product.personsAmount === this.menuTabsConfig.personsAmount;
                const defaultGoodsLengthValid = product.defaultGoodsModels.length === this.menuTabsConfig.defaultGoodsLength;
                const isProductFromList = this.menuTabsConfig.tabsSortRule.includes(product.class);

                return personsAmountValid && defaultGoodsLengthValid && isProductFromList;
              }));
            }
          });
          _.each(this.menuTabsConfig.tabsSortRule, (className: string) => {
            const sortedByOrderProduct = _.filter(products, (product: IProduct) => product.class === className)[0];
            sortedProducts.push(sortedByOrderProduct);
          });
          return sortedProducts;
        })
      );
  }
}
