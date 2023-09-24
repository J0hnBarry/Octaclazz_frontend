import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CustomerListView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [relations, setRelations] = useState(null);
  const {user} = useSelector((state => state.account));

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'account/wallet/userlist/' + user._id)
      .then((response) => {
        if (isMountedRef.current) {
          setRelations(response.data.relation);
        }
      });
  }, [isMountedRef, user._id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!relations) {
    return null;
  }


  return (

      <Container className={classes.root} maxWidth={false}>
        <Header />
        {relations && (
          <Box mt={3}>
            <Results customers={relations} />
          </Box>
        )}
      </Container>
  );
}

export default CustomerListView;
