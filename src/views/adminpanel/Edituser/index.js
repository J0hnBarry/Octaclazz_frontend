import React, {
  useState,
  useEffect,
  useCallback
}  from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Profile from './Profile';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function OverviewView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [user, setUser] = useState(null);
    const params = useParams();
  
    const getCustomers = useCallback(() => {
      axios
        .get(API_BASE_URL + 'admin/users/edit/' + params.userId)
        .then((response) => {
          if (isMountedRef.current) {
            setUser(response.data.user);
          }
        });
    }, [isMountedRef, params.userId]);
  
    useEffect(() => {
      getCustomers();
    }, [getCustomers]);
  
    if (!user) {
      return null;
    }

  return (
    <Page
      className={classes.root}
      title="Edit user"
    >
      <Container maxWidth="lg">
        <Header />     
        <Box mt={6}>
          <Profile user = {user} />
        </Box>
      </Container>
    </Page>
  );
}

export default OverviewView;
