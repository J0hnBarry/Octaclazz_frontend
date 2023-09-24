import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CourseCreateForm from './CourseCreateForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';

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
  const isMountedRef = useIsMountedRef();
  const [course, setCourse] = useState(null);
  const params = useParams();

  const getCourse = useCallback(() => {
    axios
      .post(API_BASE_URL + '/courses/take',{
        courseId : params.Id
      })
      .then((response) => {
        if (isMountedRef.current) {
          setCourse(response.data.course);
        }
      });
  }, [isMountedRef, params.Id]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  if (!course) {
    return null;
  }



  return (
    <Page
      className={classes.root}
      title="Pushing announcement"
    >
      <Container maxWidth="lg">
        <Header />
        <CourseCreateForm course={course}/>
      </Container>
    </Page>
  );
}

export default CourseCreateView;
