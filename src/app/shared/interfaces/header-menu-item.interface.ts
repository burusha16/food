import { HeaderMenuResponseTypes } from "../enums/header-menu-response-types.enum";

export interface IHeaderMenuItem {
  icon?: string;
  name: string;
  routerLink?: string;
  theme?: string;
  url?: string;
  type: HeaderMenuResponseTypes;
}
