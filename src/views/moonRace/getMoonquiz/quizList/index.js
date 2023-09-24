import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Card,
  CardHeader,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
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

function ProjectBrowseView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [assessments, setAssessments] = useState([]);

  const getCourses = useCallback(() => {
    axios
      .get(API_BASE_URL + 'assessments/moonquiz/list')
      .then((response) => {
        if (isMountedRef.current) {
          setAssessments(response.data.quizzes);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <Page
      className={classes.root}
      title="Moon quiz Page"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={6}>
          {(assessments.length !== 0) &&
          <Results courses={assessments} />
          }  
           {(assessments.length === 0) &&
          <Card>
            <CardHeader title = "Moon quiz don't exist." />
          </Card>
          }  
        </Box>
      </Container>
    </Page>
  );
}

export default ProjectBrowseView;
