import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/account/wallet').reply(200, {
  statistics: {
    total: '10000',
    loan: '3000',
    gift:"1000",
    borrowed: '2000',
    pending: '1000'
  }
});


mock.onGet('/api/projects/projects').reply(200, {
  projects: [
    {
      id: '5e8dcef8f95685ce21f16f3d',
      title: 'Mella Full Screen Slider',
      media: '/static/images/projects/project_1.png',
      description: `
We're looking for experienced Developers and Product Designers to
come aboard and help us build succesful businesses through software.
      `,
      author: {
        id: '5e887b7602bdbc4dbb234b27',
        name: 'Anje Keizer',
        avatar: '/static/images/avatars/avatar_5.png'
      },
      type: 'Full-Time',
      location: 'Europe',
      technology: 'Vue JS',
      isLiked: true,
      likes: 7,
      rating: 5,
      subscribers: 2,
      updatedAt: moment()
        .subtract(24, 'minutes')
        .toDate()
        .getTime()
    },
    {
      id: '5e8dcf076c50b9d8e756a5a2',
      title: 'Dashboard Design',
      media: '/static/images/projects/project_2.png',
      description: `
We're looking for experienced Developers and Product Designers to
come aboard and help us build succesful businesses through software.
      `,
      author: {
        id: '5e887d0b3d090c1b8f162003',
        name: 'Emilee Simchenko',
        avatar: '/static/images/avatars/avatar_9.png'
      },
      type: 'Full-Time',
      location: 'Europe',
      technology: 'Angular',
      isLiked: false,
      likes: 12,
      rating: 4.5,
      subscribers: 3,
      updatedAt: moment()
        .subtract(1, 'hour')
        .toDate()
        .getTime()
    },
    {
      id: '5e8dcf105a6732b3ed82cf7a',
      title: 'Ten80 Web Design',
      media: '/static/images/projects/project_3.png',
      description: `
We're looking for experienced Developers and Product Designers to
come aboard and help us build succesful businesses through software.
      `,
      author: {
        id: '5e88792be2d4cfb4bf0971d9',
        name: 'Elliott Stone',
        avatar: '/static/images/avatars/avatar_10.png'
      },
      type: 'Full-Time',
      location: 'Europe',
      technology: 'Ember JS',
      isLiked: true,
      likes: 18,
      rating: 4.7,
      subscribers: 8,
      updatedAt: moment()
        .subtract(16, 'hour')
        .toDate()
        .getTime()
    },
    {
      id: '5e8dcf1cc7155d0e947dc27f',
      title: 'Neura e-commerce UI Kit',
      media: '/static/images/projects/project_4.png',
      description: `
We're looking for experienced Developers and Product Designers to
come aboard and help us build succesful businesses through software.
      `,
      author: {
        id: '5e8877da9a65442b11551975',
        name: 'Shen Zhi',
        avatar: '/static/images/avatars/avatar_11.png'
      },
      type: 'Full-Time',
      location: 'Europe',
      technology: 'Java Spring',
      isLiked: false,
      likes: 1,
      rating: 2,
      subscribers: 10,
      updatedAt: moment()
        .subtract(3, 'days')
        .toDate()
        .getTime()
    },
    {
      id: '5e8dcf252313876001e83221',
      title: 'Administrator Dashboard',
      media: '/static/images/projects/project_5.jpg',
      description: `
We're looking for experienced Developers and Product Designers to
come aboard and help us build succesful businesses through software.
      `,
      author: {
        id: '5e887ac47eed253091be10cb',
        name: 'Cao Yu',
        avatar: '/static/images/avatars/avatar_3.png'
      },
      type: 'Full-Time',
      location: 'Europe',
      technology: 'Django',
      isLiked: false,
      likes: 7,
      rating: 5,
      subscribers: 2,
      updatedAt: moment()
        .subtract(7, 'days')
        .toDate()
        .getTime()
    },
    {
      id: '5e8dcf4250d77c954b04902e',
      title: 'Kalli UI Kit',
      media: '',
      description: `
We're looking for experienced Developers and Product Designers to
come aboard and help us build succesful businesses through software.
      `,
      author: {
        id: '5e887b7602bdbc4dbb234b27',
        name: 'Anje Keizer',
        avatar: '/static/images/avatars/avatar_5.png'
      },
      type: 'Full-Time',
      location: 'Europe',
      technology: 'React JS',
      isLiked: true,
      likes: 4,
      rating: 4.2,
      subscribers: 12,
      updatedAt: moment()
        .subtract(8, 'days')
        .toDate()
        .getTime()
    }
  ]
});
