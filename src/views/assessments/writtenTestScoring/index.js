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
import List from './List';
import { API_BASE_URL } from 'src/config';
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
  const [assessments, setAssessments] = useState(null);
  const user = useSelector((state) => state.account.user)

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'assessments/assessments/edit/' + user.email)
      .then((response) => {
        if (isMountedRef.current) {
          setAssessments(response.data.assessments);
        }
      });
  }, [isMountedRef,  user.email]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!assessments) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Own Course List"
    >
      <Container maxWidth={false}>
        <Header />
        {assessments && (
          <Box mt={3}>
            <List Myassessments={assessments}/>
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
