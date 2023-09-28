import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import {useSelector} from 'react-redux';
 import CourseCreateForm from './CourseCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function CourseCreateView() {
  const classes = useStyles();
  const user = useSelector((state) => state.account.user);


  return (
    <Page
      className={classes.root}
      title="Adding course"
    >
      <Container maxWidth="lg">
        <Header />
        <CourseCreateForm lecturer={user.email}/>
      </Container>
    </Page>
  );
}

export default CourseCreateView;
