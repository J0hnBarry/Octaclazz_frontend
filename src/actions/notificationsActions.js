import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';

export const GET_NOTIFICATIONS = '@notifications/get-notifications';

export function getNotifications(userId) {
  if(userId)
  {const request = axios.get(API_BASE_URL + 'notifications/get/' + userId);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_NOTIFICATIONS,
      payload: response.data
    }));
  };
}
}
