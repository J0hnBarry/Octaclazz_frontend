import React,{
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
import Header from './Header';
import Filter from './Filter.js';
import CourseData from './courseData';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
     backgroundColor: theme.palette.background.dark,
     width:"100%",
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    overflowY:"scroll"
  }
}));

function ProjectBrowseView() {
  const classes = useStyles();
  const params = useParams();
  var Id = params.Id;

  const isMountedRef = useIsMountedRef();
  const [course, setCourse] = useState({});

  const getProjects = useCallback(() => {
    axios
      .post(API_BASE_URL + 'courses/take', {
        courseId: Id
      } )
      .then((response) => {
        if (isMountedRef.current) {
          setCourse(response.data.course);
        }
      });
  }, [isMountedRef, Id]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if(!course)
  return ;


  return (
    <Page
      className={classes.root}
      title="Taking Corse"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter course={course} />
        </Box>
        <Box mt={6}>
          <CourseData course={course} />
        </Box>
      </Container>
    </Page>
  );
}

export default ProjectBrowseView;
