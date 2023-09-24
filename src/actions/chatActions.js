

export const GET_CONTACTS = '@chat/get-contacts';
export const GET_THREADS = '@chat/get-threads';
export const OPEN_SIDEBAR = '@chat/open-sidebar';
export const CLOSE_SIDEBAR = '@chat/close-sidebar';


export function getContacts(contacts) {

  return (dispatch) => {
    dispatch({
      type: GET_CONTACTS,
      payload: {contacts:contacts}
    });
  };
}

export function getThreads(threads) {

  return (dispatch) => {
    dispatch({
      type: GET_THREADS,
      payload: {threads:threads}
    });
  };
}
 

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR
  };
}
