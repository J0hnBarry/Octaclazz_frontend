import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/courses/current').reply(200, {
  project: {
    active: true,
    endDate: moment()
      .add(14, 'days')
      .toDate()
      .getTime(),
    title: 'Develop a PDF Export App',
    author: {
      id: '5e887d0b3d090c1b8f162003',
      name: 'Emilee Simchenko',
      avatar: '/static/images/avatars/avatar_9.png',
      bio: 'We build beautiful functional themes for web professionals'
    },
    brief: `
Design files are attached in the files tab.

Develop the web app screens for our product called "PDFace". Please look at the wireframes, system activity workflow and read the section above to understand what we're trying to archive.

There's not many screens we need designed, but there will be modals and various other system triggered events that will need to be considered.

The project has been created in Sketch so let me know if there are any problems opening this project and I'll try to convert into a usable file.
    `,
    tags: ['React JS'],

    Curriculum: `This is Curriculum`,
    FAQ: `This is FAQ`,
    Announcements:`This is Announcements`,
    Review:`This is Review`,
    videos:[
      {id:1,
        content:`1-hours-on-demand-Video`
      },
      {id:2,
        content:`2-hours-on-demand-Video`
      },
      {id:3,
        content:`3-hours-on-demand-Video`
      },
      {id:4,
        content:`4-hours-on-demand-Video`
      },
      {id:5,
        content:`5-hours-on-demand-Video`
      },
      {id:6,
        content:`6-hours-on-demand-Video`
      },
      {id:7,
        content:`7-hours-on-demand-Video`
      },
      {id:8,
        content:`8-hours-on-demand-Video`
      },
    ],
    about:{
      data:'/static/images/courses/one.jpg',
      notes:'This course is very important for everone! Let us study hard!',
      description:'This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard! This course is very important for everone! Let us study hard!'

  },
    updatedAt: moment()
      .subtract(23, 'minutes')
      .toDate()
      .getTime()
  }
});
