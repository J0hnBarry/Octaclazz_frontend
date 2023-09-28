// import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/management/customers').reply(200, {
  customers: [
    {
      id: '5e887a62195cc5aef7e8ca5d',
      name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      avatar: '/static/images/avatars/avatar_2.png',
      spent: '500.00',
      currency: 'VN',
      orders: 1,
      finance:2000,
      isProspect: false,
      isReturning: false,
      acceptsMarketing: false,
      updatedAt: moment()
        .subtract(1, 'days')
        .toDate()
        .getTime(),
      location: 'West Virginia, USA'
    },
    {
      id: '5e887ac47eed253091be10cb',
      name: 'Cao Yu',
      email: 'cao.yu@devias.io',
      avatar: '/static/images/avatars/avatar_3.png',
      spent: '300.00',
      currency: 'VN',
      orders: 3,
      finance:3000,
      isProspect: false,
      isReturning: true,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(1, 'days')
        .subtract(7, 'hours')
        .toDate()
        .getTime(),
      location: 'Bristow'
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      name: 'Alex Richardson',
      email: 'alex.richardson@devias.io',
      avatar: '/static/images/avatars/avatar_4.png',
      spent: '0.00',
      currency: 'VN',
      orders: 0,
      finance:4000,
      isProspect: true,
      isReturning: false,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime(),
      location: 'Georgia, USA'
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      name: 'Anje Keizer',
      email: 'anje.keizer@devias.io',
      avatar: '/static/images/avatars/avatar_5.png',
      spent: '5,600.00',
      currency: 'VN',
      orders: 6,
      finance:1000,
      isProspect: false,
      isReturning: false,
      acceptsMarketing: false,
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(4, 'hours')
        .toDate()
        .getTime(),
      location: 'Ohio, USA'
    },
    {
      id: '5e86809283e28b96d2d38537',
      name: 'Divine Xavi',
      email: 'Divine.A@devias.io',
      avatar: '/static/images/avatars/me.png',
      spent: '500.00',
      currency: 'VN',
      orders: 1,
      finance:10000,
      isProspect: false,
      isReturning: true,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(11, 'hours')
        .toDate()
        .getTime(),
      location: 'Texas, USA'
    },
    {
      id: '5e86805e2bafd54f66cc95c3',
      name: 'Adam Denisov',
      email: 'adam.denisov@devias.io',
      avatar: '/static/images/avatars/avatar_7.png',
      spent: '0.00',
      currency: 'VN',
      orders: 0,
      finance:8000,
      isProspect: true,
      isReturning: false,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(3, 'days')
        .subtract(7, 'hours')
        .toDate()
        .getTime(),
      location: 'California, USA'
    },
    {
      id: '5e887a1fbefd7938eea9c981',
      name: 'Miller Edwards',
      email: 'miller.edwards@devias.io',
      avatar: '/static/images/avatars/avatar_8.png',
      spent: '0.00',
      currency: 'VN',
      orders: 0,
      finance:2000,
      isProspect: true,
      isReturning: false,
      acceptsMarketing: false,
      updatedAt: moment()
        .subtract(4, 'days')
        .subtract(5, 'hours')
        .toDate()
        .getTime(),
      location: 'California, USA'
    },
    {
      id: '5e887d0b3d090c1b8f162003',
      name: 'Emilee Simchenko',
      email: 'emilee.simchenko@devias.io',
      avatar: '/static/images/avatars/avatar_9.png',
      spent: '100.00',
      currency: 'VN',
      orders: 4,
      finance:5000,
      isProspect: false,
      isReturning: false,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(4, 'days')
        .subtract(15, 'hours')
        .toDate()
        .getTime(),
      location: 'Nevada, USA'
    },
    {
      id: '5e88792be2d4cfb4bf0971d9',
      name: 'Elliott Stone',
      email: 'elliott.stone@devias.io',
      avatar: '/static/images/avatars/avatar_10.png',
      spent: '1,000.00',
      currency: 'VN',
      orders: 2,
      finance:1500,
      isProspect: false,
      isReturning: true,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(5, 'days')
        .subtract(2, 'hours')
        .toDate()
        .getTime(),
      location: 'Michigan, USA'
    },
    {
      id: '5e8877da9a65442b11551975',
      name: 'Shen Zhi',
      email: 'shen.zhi@devias.io',
      avatar: '/static/images/avatars/avatar_11.png',
      spent: '0.00',
      currency: 'VN',
      orders: 0,
      finance:2500,
      isProspect: true,
      isReturning: false,
      acceptsMarketing: true,
      updatedAt: moment()
        .subtract(6, 'days')
        .subtract(8, 'hours')
        .toDate()
        .getTime(),
      location: 'Utah, USA'
    },
    {
      id: '5e8680e60cba5019c5ca6fda',
      name: 'Merrile Burgett',
      email: 'merrile.burgett@devias.io',
      avatar: '/static/images/avatars/avatar_12.png',
      spent: '200.00',
      currency: 'VN',
      orders: 7,
      finance:3000,
      isProspect: false,
      isReturning: true,
      acceptsMarketing: false,
      updatedAt: moment()
        .subtract(9, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime(),
      location: 'Utah, USA'
    }
  ]
});

