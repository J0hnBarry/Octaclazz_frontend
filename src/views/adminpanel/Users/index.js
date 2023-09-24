import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import UserList from './CustomerListView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function OverviewView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="User list"
    >
      <Container maxWidth="lg">
        <Header />     
        <Box mt={6}>
          <UserList />
        </Box>
      </Container>
    </Page>
  );
}

export default OverviewView;
