import { IHeaderMenuItem } from "../interfaces/app-menu.interface";
import { ServiceLocator } from "../services/locator.service";
import { HeaderMenuResponseTypes } from "../enums/header-menu-response-types.enum";

export class HeaderMenuItem implements IHeaderMenuItem {
  icon?: string;
  name: string;
  routerLink?: string;
  theme?: string;
  type: HeaderMenuResponseTypes;
  url?: string;

  constructor(data: IHeaderMenuItem) {
    this.icon = data.icon;
    this.name = ServiceLocator.translate.instant(data.name);
    this.routerLink = data.routerLink;
    this.theme = data.theme;
    this.type = data.type;
    this.url = data.url;
  }
}
