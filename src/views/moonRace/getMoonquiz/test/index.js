import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Paper,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import Objective from './objective';
import ResultObj from './Resultquiz';
import { API_BASE_URL } from 'src/config';
import { useParams} from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Function from './Functions';
import Chart from './moonChart';
import { useSnackbar } from 'notistack';
import { useDispatch} from 'react-redux';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(3)
  },
  avatar: {
    backgroundColor: colors.red[600]
  }
}));

function ProjectCreateView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date())
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(false);
  const [select, setSelect] = useState(null);
  const [showanswer, setShowanswer] = useState(false);
  const params = useParams();
  const user = useSelector((state) => state.account.user);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/moonquiz/getStart',{
        Id:params.Id,
        userId:user._id
      })
      .then((response) => {
        if (isMountedRef.current) {
          setQuiz(response.data.moonquiz);
        }
      });
  }, [isMountedRef, params.Id, user._id]);


  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  useEffect(() => {
      setTimeout(() => setFakeCurrentDate(new Date()), 60000)
  }, [fakeCurrentDate])

  if(!quiz)
  return null;


  var myData = '';
 
    for(var k = 0; k < quiz.learners.length ; k++)
    {
      if(quiz.learners[k].id._id === user._id)
        myData = quiz.learners[k];
    }

    var toCompare = moment().subtract(myData.buytimenum, 'minutes');
    var timeRule = moment(quiz.endtime).from(toCompare);

    if(!score)
    {if(moment(quiz.endtime).format('YYYY-MM-DD HH:mm')<= moment().subtract(myData.buytimenum, 'minutes').format('YYYY-MM-DD HH:mm'))
      setScore(true);}


    if(!score)
    {
      if((quiz.goalnum === myData.correctanswernum) || (quiz.goalnum === myData.questionstep))
      setScore(true);
    }

  const handleNext = (flag) => {

    if(flag===null)
    enqueueSnackbar("You must select one answer.", {
      variant: 'error',
    }); 
    else{
    axios
    .post(API_BASE_URL + 'assessments/moonquiz/nextStep',{
      Id:params.Id,
      userId:user._id,
      correct : flag
    })
    .then((response) => {
        setQuiz(response.data.moonquiz);
        setSelect(null);
        setShowanswer(false);
    });
   }
  };

  const handleChange = (value) => {
    setSelect(value);
  }

  const addtime=() =>{
    if(user.wallet< quiz.timecost)
      enqueueSnackbar("You have not enough money.", {
        variant: 'error',
      }); 
    else{
      if(quiz.timenumber <= myData.buytimenum)
        enqueueSnackbar("You have already purchased the maximum possible time.", {
          variant: 'error',
        }); 
      else{
        axios
        .post(API_BASE_URL + 'assessments/moonquiz/func/buytime',{
          Id:params.Id,
          userId:user._id
        })
        .then(async(response) => {
            setQuiz(response.data.moonquiz);
            const newuser = await authService.loginInWithToken();
            await dispatch(setUserData(newuser));
            enqueueSnackbar("Successfully purchased.", {
              variant: 'success',
            });
        });
      }
    }
  }

  const streakturbo=(flag) =>{
    if(user.wallet< quiz.streakcost)
      {enqueueSnackbar("You have not enough money.", {
        variant: 'error',
      }); 
    }
    else{
      if(quiz.streakturbonum <= myData.streakturbonum)
        {enqueueSnackbar("You have already used max possible streak turboes", {
          variant: 'error',
        }); 
      }
      else{
        axios
        .post(API_BASE_URL + 'assessments/moonquiz/func/streakenable',{
          Id:params.Id,
          userId:user._id,
          flag
        })
        .then(async(response) => {
            setQuiz(response.data.moonquiz);
            const newuser = await authService.loginInWithToken();
            await dispatch(setUserData(newuser));
            enqueueSnackbar("Successfully enabled.", {
              variant: 'success',
            });
        });
      }
    }
  }

  
  const buyveto=() =>{
    if(user.wallet< quiz.buyvetocost)
      {enqueueSnackbar("You have not enough money.", {
        variant: 'error',
      }); 
    }
    else{
      if(quiz.buyvetonum <= myData.buyvetonum)
        {enqueueSnackbar("You have already purchased the maximum possible veto boost.", {
          variant: 'error',
        }); 
      }
      else{
        axios
        .post(API_BASE_URL + 'assessments/moonquiz/func/buyVetoBoost',{
          Id:params.Id,
          userId:user._id,
        })
        .then(async(response) => {
            setQuiz(response.data.moonquiz);
            const newuser = await authService.loginInWithToken();
            await dispatch(setUserData(newuser));
            enqueueSnackbar("Successfully purchased.", {
              variant: 'success',
            }); 
        });
      }
    }
  }


  const useveto=() =>{
 
      if( myData.vetonum <= 0)
        {enqueueSnackbar("There is no veto boost available.", {
          variant: 'error',
        }); 
      }
      else{
        axios
        .post(API_BASE_URL + 'assessments/moonquiz/func/useveto',{
          Id:params.Id,
          userId:user._id,
        })
        .then((response) => {
            setQuiz(response.data.moonquiz);
            setShowanswer(true);
        });
      }
  }


  return (
    <Page
      className={classes.root}
      title="Moon quiz start"
    >

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
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Moon quiz
            </Typography>
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
            This is Moon quiz page.
          </Typography>
          <Typography
            variant="h2"
            color="textPrimary"
            style={{textAlign:"center"}}
          >
            {quiz.name}
          </Typography>
        </Box>
        {(!score) &&
          <Paper>
            <Grid container>
              <Grid
                item
                lg={5}
                xs={12}
                sm={12}
                md={5}
              >
                <Box p={3}>
                    <Objective
                    timeRule={timeRule}
                    rewardsvn={quiz.rewardsvn}
                    rewardsfreeze={quiz.rewardsfreeze}
                    question={quiz.questions[myData.questionstep]}
                    select = {select}
                    showanswer = {showanswer}
                    onNext={handleNext}
                    handleChange1={handleChange}
                    />
                </Box>
              </Grid>
              <Grid
                item
                lg={7}
                xs={12}
                sm={12}
                md={7}
              >
                <Function                
                mydata={myData} quiz={quiz}
                addtime ={addtime}
                streakturbo = {streakturbo}
                buyveto ={buyveto}
                useveto = {useveto}
                />
              </Grid>
              </Grid>
            </Paper>
            }
          {(!score) &&
            <Grid
            container
            alignItems='center'
            >         
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
              <Chart max={quiz.goalnum} mydata={quiz.learners}/>
              </Grid>
            </Grid>
           }
           {(score) &&
           <ResultObj paramsId={params.Id} userId={user._id}/>
           }
    </Page>
  );
}

export default ProjectCreateView;
