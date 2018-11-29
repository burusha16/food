import { IOffer } from "./offers.interface";

export interface IOffersResponse {
  goods: IOffer[];
  defaultWeekKey: string;
}