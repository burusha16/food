import {IGood, IGoodData, IGoodImages, IGoodIngredients, IGoodNames} from '@shared/interfaces/good.interface';
import {INutritionalValue, INutritionalValueData} from '@shared/interfaces/nutritional-value.interface';

export class Good implements IGood {
  cookingTime: number;
  dayNumber: number;
  id: string;
  images: IGoodImages;
  ingredients: IGoodIngredients[];
  name: string;
  names: IGoodNames;
  nutritionalValue: INutritionalValue[];
  portionsCount: number;
  recipeUrl: string;
  requiredCookware: string[];
  tags: string[];
  weight: number;

  constructor(data: IGoodData) {
    this.cookingTime = data.cookingTime;
    this.dayNumber = data.dayNumber;
    this.id = data.id;
    this.images = data.images;
    this.ingredients = data.ingredients;
    this.name = data.name;
    this.names = data.names;
    this.nutritionalValue = this.getNutritionalValue(data.nutritionalValue);
    this.portionsCount = data.portionsCount;
    this.recipeUrl = data.recipeUrl;
    this.requiredCookware = this.getRequiredCookware(data.requiredCookware);
    this.tags = data.tags;
    this.weight = data.weight;
  }

  getRequiredCookware(text: string): string[] {
    const filterdText = text.replace(/\./g, '');
    return filterdText.split(',');
  }

  getNutritionalValue(nutritionalValue: INutritionalValueData): INutritionalValue[] {
    const array: INutritionalValue[] = [];
    for (const key in nutritionalValue) {
      if (key && nutritionalValue[key]) {
        array.push({'key': key, 'value': nutritionalValue[key]} as INutritionalValue);
      }
    }
    return array;
  }
}
