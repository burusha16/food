import { Injectable } from '@angular/core';
import {IMenuTabsConfig} from '../interfaces/app-config.interface';
import {ISmiItem} from '../interfaces/smi-list-item.iterface';
import {AppMenu, FeedbacksList, OrderFormConfig, MenuTabsConfig, SmiList, PaymentConfig} from '@shared/other/app.config';
import {IFooterMenuItem, IHeaderMenuItem} from '@shared/interfaces/app-menu.interface';
import {IFeedback} from '@shared/interfaces/feedback.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {IPaymentConfig} from '@shared/interfaces/payment-config.interface';

@Injectable({providedIn: 'root'})
export class AppService {
  actualWeekKey: string;
  feedbacksList: IFeedback[];
  footerMenu: IFooterMenuItem[];
  footerSocialList: IFooterMenuItem[];
  headerMenu: IHeaderMenuItem[];
  headerMenuMobBody: IHeaderMenuItem[];
  headerMenuMobFooter: IHeaderMenuItem[];
  menuTabsConfig: IMenuTabsConfig;
  orderFormConfig: IOrderFormConfig;
  paymentConfig: IPaymentConfig;
  smiList: ISmiItem[];

  constructor() {
    this.feedbacksList = FeedbacksList;
    this.footerMenu = AppMenu.footer;
    this.footerSocialList = AppMenu.footerSocial;
    this.headerMenu = AppMenu.headerDesktop;
    this.headerMenuMobBody = AppMenu.headerMobileBody;
    this.headerMenuMobFooter = AppMenu.headerMobileFooter;
    this.menuTabsConfig = MenuTabsConfig;
    this.orderFormConfig = OrderFormConfig;
    this.paymentConfig = PaymentConfig;
    this.smiList = SmiList;
  }
}
