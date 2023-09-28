import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/notifications').reply(200, {
  notifications: [
    {
      id: '5e8883f1b51cc1956a5a1ec0',
      title: 'New assessments were uploaded',
      description: 'Grometry of Math',
      type: 'order_placed',
      createdAt: moment()
        .subtract(2, 'hours')
        .toDate()
        .getTime()
    },
    {
      id: '5e8883f7ed1486d665d8be1e',
      title: 'New message received',
      description: 'You have 32 unread messages',
      type: 'new_message',
      createdAt: moment()
        .subtract(1, 'day')
        .toDate()
        .getTime()
    },
    {
      id: '5e8883fca0e8612044248ecf',
      title: 'Course materials were uploaded',
      description: 'Chemistry',
      type: 'item_shipped',
      createdAt: moment()
        .subtract(3, 'days')
        .toDate()
        .getTime()
    }
  ]
});
