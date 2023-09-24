
import mock from 'src/utils/mock';

mock.onGet('/api/assessments/assessments').reply(200, {
  courses: [
    {
      id: '5e8dcef8f95685ce21f16f3d',
      section: 'Geometry',
      media: '/static/images/courses/course.jpg',
      course:'Math',
      questions:"0 questions"
    },
    {
      id: '5e8dcf076c50b9d8e756a5a2',
      section: 'Obj test 1',
      media: '/static/images/courses/course.jpg',
      course:'Math',
      questions:"1 questions"
    },
    {
      id: '5e8dcf105a6732b3ed82cf7a',
      section: 'MTH202 Test',
      media: '/static/images/courses/course.jpg',
      course:'Math',
      questions:"2 questions"
    },
    {
      id: '5e8dcf1cc7155d0e947dc27f',
      section: 'ANother Final Test',
      media: '/static/images/courses/course.jpg',
      course:'Chemistry',
      questions:"0 questions"
    },
    {
      id: '5e8dcf252313876001e83221',
      section: 'Let us test all additions',
      media: '/static/images/courses/course.jpg',
      course:'Chemistry',
      questions:"0 questions"
    },
    {
      id: '5e8dcf4250d77c954b04902e',
      section: 'New physics test',
      media: '/static/images/courses/course.jpg',
      course:'Physics',
      questions:"0 questions"
    }
  ]
});
