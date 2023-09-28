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
import Page from 'src/components/Page';
import Header from './Header';
import CourseList from './List';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import AssessList from './assessList';

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
  const [courses, setCourses] = useState(null);
  const [assessments, setAssessments] = useState(null);

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'admin/courses/list')
      .then((response) => {
        if (isMountedRef.current) {
          setCourses(response.data.courses);
          setAssessments(response.data.assessments);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!courses || !assessments) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Courses and assessments edit"
    >
      <Container maxWidth="lg">
        <Header />     
        <Box mt={6}>
          <CourseList Mycourses={courses} />
        </Box>
        <Box mt={6}>
          <AssessList Myassessments={assessments} />
          </Box>
      </Container>
    </Page>
  );
}

export default OverviewView;
