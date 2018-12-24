import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'deliveryDates'
})
export class DeliveryDatesPipe implements PipeTransform {
  constructor() {
  }

  transform(dates: string[]): string {
    if (dates && dates.length > 1) {
      const firstDate = dates[0];
      const secondDate = dates[1];
      const isSameMonth = moment(firstDate).format('MM') === moment(secondDate).format('MM');

      if (isSameMonth) {
        return `${moment(firstDate).format('D')}-${moment(secondDate).format('D MMMM')}`;
      } else {
        return `${moment(firstDate).format('D MMMM')} - ${moment(secondDate).format('D MMMM')}`;
      }
    } else {
      return '';
    }
  }
}
