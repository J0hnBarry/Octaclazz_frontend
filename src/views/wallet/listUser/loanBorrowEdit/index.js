import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import CustomerEditForm from './CustomerEditForm';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CustomerEditView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [customer, setCustomer] = useState();
  const params = useParams();
  const {user}  = useSelector((state) => state.account);

  const getCustomer = useCallback(() => {
    axios
      .post(API_BASE_URL + 'account/wallet/getOne', {
        myId : user._id,
        userId : params.Id
      })
      .then((response) => {
        if (isMountedRef.current) {
          setCustomer(response.data.relation);
        }
      });
  }, [isMountedRef, user._id, params.Id]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!customer) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Loan & borrow edit"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <CustomerEditForm customer={customer} />
        </Box>
      </Container>
    </Page>
  );
}

export default CustomerEditView;
