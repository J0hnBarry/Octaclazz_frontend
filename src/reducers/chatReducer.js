/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_CONTACTS,
  GET_THREADS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from 'src/actions/chatActions';


const initialState = {
  contacts: [],
  threads:'',
  sidebarOpen: false
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS: {
      const { contacts } = action.payload;

      return produce(state, (draft) => {
        draft.contacts = contacts
      });
    }

    case GET_THREADS: {
      const { threads } = action.payload;

      return produce(state, (draft) => {
        draft.threads = threads;
      });
    }

    case OPEN_SIDEBAR: {
      return produce(state, (draft) => {
        draft.sidebarOpen = true;
      });
    }

    case CLOSE_SIDEBAR: {
      return produce(state, (draft) => {
        draft.sidebarOpen = false;
      });
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
