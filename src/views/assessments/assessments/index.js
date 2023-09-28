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
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Results from './Results';
import { API_BASE_URL } from 'src/config';
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
  const [assessments, setAssessments] = useState([]);
  const {user} = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const getCourses = useCallback(() => {
    axios
      .get(API_BASE_URL + 'assessments/assessments/list/' + user._id)
      .then((response) => {
        if (isMountedRef.current) {
          setAssessments(response.data.assessments);
          dispatch(getNotifications(user._id));
        }
      });
  }, [isMountedRef, user._id, dispatch ]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  if(!assessments)
  return ;

  return (
    <Page
      className={classes.root}
      title="Assessments Page"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={6}>
          <Results courses={assessments} />
        </Box>
      </Container>
    </Page>
  );
}

export default ProjectBrowseView;
