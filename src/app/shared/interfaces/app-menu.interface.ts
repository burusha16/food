import { HeaderMenuResponseTypes } from '../enums/header-menu-response-types.enum';

export interface IAppMenu {
  headerDesktop: IHeaderMenuItem[];
  headerMobileFooter: IHeaderMenuItem[];
  headerMobileBody: IHeaderMenuItem[];
  footer: IFooterMenuItem[];
  footerSocial: IFooterMenuItem[];
}

export interface IHeaderMenuItem {
  icon?: string;
  key: string;
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
