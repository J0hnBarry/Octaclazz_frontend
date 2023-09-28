
import mock from 'src/utils/mock';

mock.onGet('/api/courses').reply(200, {
  courses: [
    {
      id: '5e8dcef8f95685ce21f16f3d',
      title: 'Math',
      media: '/static/images/courses/ba1.jpg',
      lesson:"2 lessons"
    },
    {
      id: '5e8dcf076c50b9d8e756a5a2',
      title: 'Chemistry',
      media: '/static/images/courses/ba2.jpg',
      lesson:"5 lessons"
    },
    {
      id: '5e8dcf105a6732b3ed82cf7a',
      title: 'Social studies',
      media: '/static/images/courses/ba3.jpg',
      lesson:"1 lessons"
    },
    {
      id: '5e8dcf1cc7155d0e947dc27f',
      title: 'Web studies',
      media: '/static/images/courses/ba7.jpg',
      lesson:"4 lessons"
    },
    {
      id: '5e8dcf252313876001e83221',
      title: 'Biology',
      media: '/static/images/courses/ba10.jpg',
      lesson:"0 lessons"
    },
    {
      id: '5e8dcf4250d77c954b04902e',
      title: 'Astronomy',
      media: '/static/images/courses/bac1.jpg',
      lesson:"0 lessons"
    }
  ]
});
