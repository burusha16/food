import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'priceCurrency'})
export class PriceCurrencyPipe implements PipeTransform {
  protected static setCurrency(currency: string) {
    let symbol = '';

    if (currency.toLowerCase() === 'usd') {
      symbol = '$';
    } else if (currency.toLowerCase() === 'rub') {
      symbol = '₽';
    }
    return symbol;
  }

  protected static rounding(rounding: boolean | undefined, value: number) {
    let newValue: number = value;

    if (rounding === true) {
      newValue = Math.ceil(value);
    } else if (rounding === false) {
      newValue = Math.floor(value);
    }
    return newValue;
  }

  protected static setForm(formProps: string[], value: any) {
    const minFractionDigits: number = parseFloat(formProps[0]);
    const maxFractionDigits: number = parseFloat(formProps[1]);
    const blockSeparator = ' ';
    const fractionSeparator = '.';
    const digitsBlockLength = 3;
    const fractionString = normalizeFraction(value, minFractionDigits, maxFractionDigits);
    const intString = normalizeInt(value, digitsBlockLength, blockSeparator);

    if (fractionString.length > 0) {
      return intString + fractionSeparator + fractionString;
    }
    return intString;

    function normalizeFraction(numberValue: number, minLength: number, maxLength: number): string {
      const fractionNumber = (numberValue % 1);
      let fractString = '';

      if (fractionNumber < 0.5 / Math.pow(10, maxLength)) {
        fractString = fractionNumber.toFixed(minLength);
      } else {
        fractString = fractionNumber.toFixed(maxLength);
      }
      return fractString.slice(2);
    }

    function normalizeInt(numberValue: number, digitsBlocksLength: number, blocksSeparator: string): string {
      let intNumber = Math.trunc(numberValue);
      const divider = Math.pow(10, digitsBlocksLength);
      const intStrings: any[] = [];

      while (intNumber > divider) {
        const remainder = intNumber % divider;
        intStrings.push(normalizePrev(remainder, 3));
        intNumber = (intNumber - remainder) / divider;
      }
      intStrings.push(intNumber.toString());
      return intStrings.reverse().join(blocksSeparator);
    }

    function normalizePrev(numberValue: number | string, max: number): string {
      return normalize(numberValue, max, (res: string, normalizer: string) => {
        return normalizer + res;
      });
    }

    function normalize(numberValue: number | string, max: number, callback: any) {
      let res = numberValue.toString();
      const count = max - res.length;
      const normalizer = '0';

      for (let i = 0; i < count; i++) {
        res = callback(res, normalizer);
      }
      return res;
    }
  }

  transform(value: any, form?: string, rounding?: boolean, currency?: string): string {
    let currencySymbol = '';
    let newValue: number | string = parseFloat(value);

    if (newValue) {
      const formProps: string[] = form ? form.split('.') : ['0', '0'];

      newValue = rounding ? PriceCurrencyPipe.rounding(rounding, newValue) : newValue;
      newValue = PriceCurrencyPipe.setForm(formProps, newValue);
      currencySymbol = currency ? PriceCurrencyPipe.setCurrency(currency) : '';
      return `${newValue} ${currencySymbol}`;
    }
    return '';
  }
}
