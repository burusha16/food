import {INutritionalValue, INutritionalValueData} from './nutritional-value.interface';

export interface IGood {
  id: string;
  name: string;
  names: IGoodNames;
  images: IGoodImages;
  dayNumber: number;
  nutritionalValue: INutritionalValue[];
  cookingTime: number;
  weight: number;
  portionsCount: number;
  requiredCookware: string[];
  ingredients: IGoodIngredients[];
  tags: string[];
  recipeUrl: string;
}

export interface IGoodData {
  id: string;
  name: string;
  names: IGoodNames;
  images: IGoodImages;
  dayNumber: number;
  nutritionalValue: INutritionalValueData;
  cookingTime: number;
  weight: number;
  portionsCount: number;
  requiredCookware: string;
  ingredients: IGoodIngredients[];
  tags: string[];
  recipeUrl: string;
}

export interface IGoodNames {
  main: string;
  secondary: string;
}

export interface IGoodImages {
  rectangular: IGoodImagesSizes;
  square: IGoodImagesSizes;
}

export interface IGoodImagesSizes {
  original: string;
  preload: string;
  s840x454?: string;
  s425x425?: string;
  s900x900?: string;
}

export interface IGoodIngredients {
  name: string;
  units: string;
  amount: number;
}
