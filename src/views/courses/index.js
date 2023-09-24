import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';
import { API_BASE_URL } from 'src/config';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from 'src/actions/notificationsActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function ProjectBrowseView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [courses, setCourses] = useState([]);
  const {user} = useSelector((state) => state.account);
  const dispatch = useDispatch();


  const getCourses = useCallback(() => {

    axios
      .get(API_BASE_URL + 'courses/list/' + user._id)
      .then((response) => {
        if (isMountedRef.current) {
          setCourses(response.data.courses);
          dispatch(getNotifications(user._id));
        }
      });
  }, [isMountedRef, user._id, dispatch]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  if(!courses)
  return ;

  return (
    <Page
      className={classes.root}
      title="Courses List"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={6}>
          <Results courses={courses} />
        </Box>
      </Container>
    </Page>
  );
}

export default ProjectBrowseView;
