import {ISmiItem} from '@shared/interfaces/smi-list-item.iterface';
import {ISliderMenuExamplesConfig} from '@shared/interfaces/app-config-response.interface';
import {IAppMenu} from '@shared/interfaces/app-menu.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {productClass} from '@shared/enums/productClass.enum';

export const SliderMenuExamplesConfig: ISliderMenuExamplesConfig = {
  'personsAmount': 2,
  'defaultGoodsLength': 5,
  'tabsSortRule': [
    'Classic',
    'Premium',
    'Family',
    'Express',
    'Fitness',
    'Vegetarian'
  ]
};

export const OrderFormConfig: IOrderFormConfig = {
  defaultClass: productClass.Classic,
  defaultDaysAmount: 5,
  defaultPersonsAmount: 2
};

export const SmiList: ISmiItem[] = [
  {
    'width': 88,
    'height': 32,
    'url': '/assets/img/main-page/smi-list/village.jpg',
    'name': 'main-page.smi-list.village'
  },
  {
    'width': 104,
    'height': 27,
    'url': '/assets/img/main-page/smi-list/ved.jpg',
    'name': 'main-page.smi-list.ved'
  },
  {
    'width': 90,
    'height': 22,
    'url': '/assets/img/main-page/smi-list/vc.jpg',
    'name': 'main-page.smi-list.vc-ru'
  },
  {
    'width': 99,
    'height': 27,
    'url': '/assets/img/main-page/smi-list/expert.jpg',
    'name': 'main-page.smi-list.experrt'
  },
  {
    'width': 110,
    'height': 34,
    'url': '/assets/img/main-page/smi-list/interfax.jpg',
    'name': 'main-page.smi-list.interfax'
  },
  {
    'width': 84,
    'height': 28,
    'url': '/assets/img/main-page/smi-list/rbc.jpg',
    'name': 'main-page.smi-list.rbc'
  }
];

export const FeedbacksList = [
  {
    'authorName': 'sergey_karjakin',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face1.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo1.jpg',
    'message': 'Когда вечером с женой возвращаемся после тяжелого рабочего дня, и придумывать, что приготовить на ужин нет сил, мы с @galiyachess выбираем #партияеды! Это отличный сервис по доставке ужинов для приготовления! Напишите @partiya_edi и попробуйте! Это правда вкусно!'
  },
  {
    'authorName': 'crashsuper',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face2.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo2.jpg',
    'message': '#партияеды'
  },
  {
    'authorName': 'feesech',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face3.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo3.jpg',
    'message': 'Ужин 2-ой ))) рататуй с томатным соусом и шашлыком из индейки в арахисе)) ну прям отчего вкусно)) спасибо #партияеды'
  },
  {
    'authorName': 'cute_marie_',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face4.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo4.jpg',
    'message': 'Ну я конечно не мастер фотографии, но кажется мастер-хозяюшка ✌️\uD83D\uDE3AНе без помощи #партияеды мы с Тёмой быстро расправились и с готовкой, и с огромными рыбинами \uD83D\uDE0F'
  },
  {
    'authorName': 'foraoneday',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face5.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo5.jpg',
    'message': 'Картина Репина \'Не дали\' #жадинаговядина #партияеды'
  },
  {
    'authorName': 'cinichenko',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face6.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo6.jpg',
    'message': '#партияеды взяли на пробу, учимся готовить'
  },
  {
    'authorName': 'olgamyshkovskaya',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face7.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo7.jpg',
    'message': 'Сегодня @partiya_edi приятно удивила - вместе с заказом нам подарили десерт недели - шоколадный кекс с фруктами. Я не стала откладывать возможность побаловать себя сладеньким и вместе с сыном мы дружно и быстро приготовили эту вкусняшечку:) #партияеды #партиязафото'
  },
  {
    'authorName': 'elenasnitovskaya',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face8.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo8.jpg',
    'message': 'И чего я раньше не готовила смузи! #Быстроивкусно Мы прямо прониклись.'
  },
  {
    'authorName': 'septimka',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face9.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo9.jpg',
    'message': 'Тортики после родов есть) winters edition с хурмой \uD83C\uDF32❄ @protamin жду домой ❤ #партияеды #флан #хурма'
  },
  {
    'authorName': 'kittycommitee',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face10.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo10.jpg',
    'message': 'Последняя на этой неделе #партияеды - лапша со свининой и овощами. Было прикольно, готовили, кроме этого, бефстроганов и буррито. Would try again!'
  },
  {
    'authorName': 'dashu_aqua',
    'authorAvatarUrl': '/assets/img/main-page/feedback-slider/face11.jpg',
    'photoUrl': '/assets/img/main-page/feedback-slider/photo11.jpg',
    'message': 'Муж дождался! На его улице праздник \uD83C\uDF89 Я сделала торт! Это бывает так редко \uD83D\uDE44'
  }
];

export const AppMenu: IAppMenu = {
  headerDesktop: [
    {
      'key': 'common.routes.phone-number-format1',
      'url': 'tel:88007778337',
      'theme': 'no-hover'
    },
    {
      'key': 'common.routes.menu',
      'routerLink': '/menu/classic'
    },
    {
      'key': 'common.routes.how-it-works',
      'routerLink': '/how'
    },
    {
      'key': 'common.routes.about-company',
      'routerLink': '/about'
    },
    {
      'key': 'common.routes.blog',
      'routerLink': '/blog'
    },
    {
      'key': 'common.routes.login',
      'routerLink': '/login',
      'icon': 'default-avatar'
    }
  ],
  headerMobileBody: [
    {
      'key': 'product.class.Classic',
      'routerLink': '/menu#classic',
    },
    {
      'key': 'product.class.Premium',
      'routerLink': '/menu#premium',
    },
    {
      'key': 'product.class.Family',
      'routerLink': '/menu#family',
    },
    {
      'key': 'product.class.Express',
      'routerLink': '/menu#10minutes',
    },
    {
      'key': 'product.class.Fitness',
      'routerLink': '/menu#fitness',
    },
    {
      'key': 'product.class.Vegetarian',
      'routerLink': '/menu#vegetarian',
    }
  ],
  headerMobileFooter: [
    {
      'key': 'common.routes.about-company',
      'routerLink': '/about',
    },
    {
      'key': 'common.routes.how-it-works',
      'routerLink': '/how',
    },
    {
      'key': 'common.routes.phone-number-format1',
      'url': 'tel:88007778337',
      'icon': 'old-phone'
    }
  ],
  footer: [
    {
      'key': 'common.routes.about-company',
      'path': '/about'
    },
    {
      'key': 'common.routes.to-menu',
      'path': '/menu#classic'
    },
    {
      'key': 'common.routes.how-it-works',
      'path': '/how'
    },
    {
      'key': 'common.routes.delivery-and-payment',
      'path': '/delivery'
    },
    {
      'key': 'common.routes.user-agreement',
      'path': '/agreement'
    },
    {
      'key': 'common.routes.for-providers',
      'path': '/for-providers'
    },
    {
      'key': 'common.routes.blog',
      'path': '/blog'
    }
  ],
  footerSocial: [
    {
      'key': 'common.social.telegram',
      'path': 'tg://resolve?domain=PEchatbot',
      'iconKey': 'telegram'
    },
    {
      'key': 'common.social.messenger',
      'path': 'https://www.facebook.com/messages/t/partiyaedi',
      'iconKey': 'messenger'
    },
    {
      'key': 'common.social.vk',
      'path': 'https://vk.me/partiyaedi',
      'iconKey': 'vk'
    },
    {
      'key': 'common.routes.phone-number-format0',
      'path': 'tel:+78007778337',
      'iconKey': 'old-phone-in-round'
    }
  ]
};


