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
}

export interface IFooterMenuItem {
  key: string;
  path: string;
  iconKey?: string;
}
