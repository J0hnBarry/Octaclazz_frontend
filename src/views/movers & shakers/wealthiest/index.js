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
  const [wealthiest, setWealthiest] = useState(null);

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'leaderboard/wealthiest')
      .then((response) => {
        if (isMountedRef.current) {
          setWealthiest(response.data.wealthiest);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!wealthiest) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Wealthiest"
    >
      <Container maxWidth={false}>
        <Header />
        {wealthiest && (
          <Box mt={3}>
            <Results customers={wealthiest} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
