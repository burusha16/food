import { HeaderMenuResponseTypes } from '../enums/header-menu-response-types.enum';

export interface IAppMenu {
  headerDesktop: IHeaderMenuItem[];
  headerMobile: IHeaderMenuItem[];
  footer: IFooterMenuItem[];
  footerSocial: IFooterMenuItem[];
}

export interface IHeaderMenuItem {
  icon?: string;
  name: string;
  routerLink?: string;
  theme?: string;
  url?: string;
  type: HeaderMenuResponseTypes;
}

export interface IFooterMenuItem {
  key: string;
  path: string;
  iconKey?: string;
}
