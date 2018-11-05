import { IHeaderMenuItem } from "../interfaces/HeaderMenuItem.interface";
import { ServiceLocator } from "../services/locator.service";

export class HeaderMenuItem implements IHeaderMenuItem {
  icon?: string;
  name: string;
  routerLink?: string;
  theme?: string;
  url?: string;

  constructor(data: IHeaderMenuItem) {
    this.icon = data.icon;
    this.name = ServiceLocator.translate.instant('header.' + data.name);
    this.routerLink = data.routerLink;
    this.theme = data.theme;
    this.url = data.url;
  }
}
