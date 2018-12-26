export interface IMenuTabsConfig {
  personsAmount: number;
  defaultGoodsLength: number;
  tabsSortRule: string[];
  linkInTab: ITabWithLink;
}

export interface ITabWithLink {
  url: string;
  key: string;
}
