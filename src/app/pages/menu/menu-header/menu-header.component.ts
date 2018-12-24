import * as _ from 'lodash/core';
import * as moment from 'moment';
import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IOffer} from '@shared/interfaces/offers.interface';
import {IOption} from '@shared/interfaces/option.interface';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuHeaderComponent {
  @Input() orderForm: FormGroup;
  @Input() set offersSetter(offers: IOffer[]) {
    this.offers = offers;
    this.offersOptions = _.map(offers, (offer: IOffer) => {
      const option: IOption = {
        available: offer.isActualWeek,
        value: offer.weekKey,
        viewValue: moment(offer.weekStart).format('DD MMMM')
      };
      return option;
    });
  }
  offersOptions: IOption[];
  offers: IOffer[];

  get isProductAvailable(): boolean {
    const dateKey: string = this.orderForm.get('dateKey').value;
    return !!_.head(_.filter(this.offers, (offer: IOffer) => offer.weekKey === dateKey));
  }

  get deliveryDatesArr(): string[] {
    const dateKey: string = this.orderForm.get('dateKey').value;
    const currentOffer: IOffer = _.head(_.filter(this.offers, (offer: IOffer) => offer.weekKey === dateKey));
    return currentOffer.deliveryDays;
  }
}
