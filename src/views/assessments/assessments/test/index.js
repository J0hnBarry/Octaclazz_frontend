import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
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
import Selection from './selection';
import Objective from './objective';
import Written from './written';
import ResultWri from './result_wri';
import ResultObj from './result_obj';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Gamificationtest from '../gamificationtest';

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
  const [activeStep, setActiveStep] = useState(0);
  const [dateline, setDateline] = useState(false);
  const [starttime, setStarttime] = useState(false);
  const [gamification, setGamofication] = useState(false);
  const [enroll, setEnroll] = useState(false);
  const [score, setScore] = useState(null);
  const params = useParams();
  const user = useSelector((state) => state.account.user);

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/assessments/dateline',{
        Id:params.Id,
        learner:user.email
      })
      .then((response) => {
        if (isMountedRef.current) {
          const date = new Date();
          const flag = moment(response.data.dateline).format('YYYY-MM-DD HH:mm') >= moment(date).format('YYYY-MM-DD HH:mm');
          const flagstart = moment(response.data.starttime).format('YYYY-MM-DD HH:mm') <= moment(date).format('YYYY-MM-DD HH:mm');
          setDateline(flag);
          setStarttime(flagstart);
          setEnroll(response.data.flag);
          setGamofication(response.data.gamificationflag);
        }
      });
  }, [isMountedRef, params.Id, user.email]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);


  const handleNext = (type) => {
    if(type==="objective")
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    else{
    setActiveStep((prevActiveStep) => prevActiveStep + 2);
    }
  };

  const handleFinish = (score) => {
   setScore(score);
  };

  return (
    <Page
      className={classes.root}
      title="Assessments test"
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
              to="/app/assessments/assessments"
              component={RouterLink}
            >
              Assessments
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
            Objective Assessment &amp; Essay Questions
          </Typography>
        </Box>
          <Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                md={12}
              >
             {(!dateline && !starttime) &&
                <Box p={3}>
                    <Typography
                      variant="h3"
                      color="textPrimary"
                    >
                      There is an error time setting!
                    </Typography>
                </Box>
              }
                {(!dateline && starttime) &&
                <Box p={3}>
                    <Typography
                      variant="h3"
                      color="textPrimary"
                    >
                      The dateline has expired!
                    </Typography>
                </Box>
              }
              {(dateline && !starttime) &&
                <Box p={3}>
                    <Typography
                      variant="h3"
                      color="textPrimary"
                    >
                      It's not time for the assessment yet!
                    </Typography>
                </Box>
              }
              {(dateline && starttime) &&
                (!enroll) &&
                <Box p={3}>
                    <Typography
                      variant="h3"
                      color="textPrimary"
                    >
                      You are not yet enrolled in this course. <br />
                      Please enroll first!
                    </Typography>
                </Box>
              }
                {(dateline && starttime) &&
                  (enroll) &&
                  <>
                  {(!gamification) &&
                <Box p={3}>
                  {activeStep === 0 && (
                    <Selection onNext={handleNext} />
                  )}
                  {activeStep === 1 && (
                    <Objective
                      onNext={handleNext}
                      onFinish = {handleFinish}
                    />
                  )}
                  {activeStep === 2 && (
                    <Written
                      onNext={handleNext}
                    />
                  )}
                  {activeStep === 3 && (
                    <ResultObj score={score} />
                  )}
                    {activeStep === 4 && (
                    <ResultWri />
                  )}
                </Box>
                  }
                  {(gamification) &&
                  <Gamificationtest />        
                  }
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
