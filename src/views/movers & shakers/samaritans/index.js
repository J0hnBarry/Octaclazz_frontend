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
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';
import { API_BASE_URL } from 'src/config';

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
  const [samaritans, setSamaritans] = useState(null);

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'leaderboard/samaritans')
      .then((response) => {
        if (isMountedRef.current) {
          setSamaritans(response.data.samaritans);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!samaritans) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="The Samaritans"
    >
      <Container maxWidth={false}>
        <Header />
        {samaritans && (
          <Box mt={3}>
            <Results customers={samaritans} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
