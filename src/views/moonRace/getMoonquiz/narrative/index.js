import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import moment from 'moment';
import Narrative from './narrative';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  avatar: {
    backgroundColor: colors.red[600]
  }
}));

function ProjectCreateView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [quiz, setQuiz] = useState(false);
  const params = useParams();

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/moonquiz/getNarrative',{
        Id:params.Id
      })
      .then((response) => {
        if (isMountedRef.current) {
          setQuiz(response.data.moonquiz);
        }
      });
  }, [isMountedRef, params.Id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const newtime = new Date();

  return (
    <Page
      className={classes.root}
      title="Narrative text"
    >
      <Container maxWidth="lg">
        <Box mb={3}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              variant="body1"
              color="inherit"
              to="/app"
              component={RouterLink}
            >
              Dashboard
            </Link>
            <Link
              variant="body1"
              color="inherit"
              to="/app/assessments/moonrace/take"
              component={RouterLink}
            >
              Moon quiz
            </Link>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Test
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            This is Moon quiz narrative text page.
          </Typography>
        </Box>
          <Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                md={12}
              >
                <Narrative narrative = {quiz.narrative} />
                {(moment(newtime) < moment(quiz.starttime)) &&
                <Box p={3}>
                    <Typography
                      variant="h3"
                      color="textPrimary"
                    >
                    It's not yet start time! <br /> <br />
                    This moon quiz will start {moment(quiz.starttime).fromNow()}                
                    </Typography>
                </Box>
              }
                {(moment(newtime) > moment(quiz.endtime)) &&
                <Box p={3}>
                    <Typography
                      variant="h3"
                      color="primary"
                    >
                      Quiz time has expired!
                    </Typography>
                </Box>
              }
              {(moment(newtime) > moment(quiz.starttime)) &&
                (moment(newtime) < moment(quiz.endtime)) &&
                <>
                  <Box mt={3}>
                  <Typography
                      variant="h3"
                      color="primary"
                      style={{textAlign:"center"}}
                    >
                  Now it's Moon Race time. let's get started
                  </Typography>
                  </Box>
                  <Box display='flex' p={3} >
                  <Button
                    component={RouterLink}
                    to="/app/assessments/moonrace/take"
                    color="secondary"
                    size="large"
                    variant="contained"
                  >
                    Back
                  </Button>
                  <Box flexGrow={1} />
                  <Button
                   component={RouterLink}
                   to={"/app/assessments/moonquiz/start/" + quiz._id}
                   color="secondary"
                   size="large"
                   variant="contained"
                  >
                    Start
                  </Button>
                </Box>
                </>
              }
              </Grid>
            </Grid>
          </Paper>
      </Container>
    </Page>
  );
}

export default ProjectCreateView;
