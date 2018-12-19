import { Injectable } from '@angular/core';
import {ISliderMenuExamplesConfig} from '../interfaces/app-config-response.interface';
import {ISmiItem} from '../interfaces/smi-list-item.iterface';
import {AppMenu, FeedbacksList, OrderFormConfig, SliderMenuExamplesConfig, SmiList} from '@shared/other/app.config';
import {IFooterMenuItem, IHeaderMenuItem} from '@shared/interfaces/app-menu.interface';
import {IFeedback} from '@shared/interfaces/feedback.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';

@Injectable()
export class AppService {
  actualWeekKey: string;
  feedbacksList: IFeedback[];
  footerMenu: IFooterMenuItem[];
  footerSocialList: IFooterMenuItem[];
  headerMenu: IHeaderMenuItem[];
  headerMenuMobBody: IHeaderMenuItem[];
  headerMenuMobFooter: IHeaderMenuItem[];
  orderFormConfig: IOrderFormConfig;
  sliderMenuExamplesConfig: ISliderMenuExamplesConfig;
  smiList: ISmiItem[];

  constructor() {
    this.feedbacksList = FeedbacksList;
    this.footerMenu = AppMenu.footer;
    this.footerSocialList = AppMenu.footerSocial;
    this.headerMenu = AppMenu.headerDesktop;
    this.headerMenuMobBody = AppMenu.headerMobileBody;
    this.headerMenuMobFooter = AppMenu.headerMobileFooter;
    this.orderFormConfig = OrderFormConfig;
    this.sliderMenuExamplesConfig = SliderMenuExamplesConfig;
    this.smiList = SmiList;
  }
}
