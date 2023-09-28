import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Results from './Results';
import { API_BASE_URL } from 'src/config';

function CustomerListView() {
  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState(null);

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'admin/users/list')
      .then((response) => {
        if (isMountedRef.current) {
          setUsers(response.data.users);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!users) {
    return null;
  }

  const onAllow = (userId) => {
    axios
    .get(API_BASE_URL + 'admin/users/allow/' + userId)
    .then((response) => {
        setUsers(response.data.users);
    });
  }

  const onDelete = (userId) => {
    axios
    .get(API_BASE_URL + 'admin/users/delete/' + userId)
    .then((response) => {
        setUsers(response.data.users);
    });
  }

  return (

      <Container maxWidth={false}>
        {users && (
          <Box mt={3}>
            <Results users={users} onAllow={onAllow} onDelete={onDelete}/>
          </Box>
        )}
      </Container>

  );
}

export default CustomerListView;
