import * as _ from 'lodash/core';
import * as moment from 'moment';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IOffer} from '@shared/interfaces/offers.interface';
import {IOption} from '@shared/interfaces/option.interface';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHeaderComponent {
  offersOptions: IOption[];
  offers: IOffer[] = this.menuService.offers;

  constructor(private menuService: MenuService) {
    this.offersOptions = _.map(this.offers, (offer: IOffer) => {
      const option: IOption = {
        available: offer.isActualWeek,
        value: offer.weekKey,
        viewValue: moment(offer.weekStart).format('DD MMMM')
      };
      return option;
    });
  }

  get deliveryDatesArr(): string[] {
    const dateKey: string = this.orderForm.get('dateKey').value;
    const currentOffer: IOffer = _.head(_.filter(this.offers, (offer: IOffer) => offer.weekKey === dateKey));
    return currentOffer.deliveryDays;
  }

  get isProductAvailable(): boolean {
    const dateKey: string = this.orderForm.get('dateKey').value;
    return !!_.head(_.filter(this.offers, (offer: IOffer) => offer.weekKey === dateKey));
  }

  get orderForm(): FormGroup {
    return this.menuService.orderForm;
  }
}
