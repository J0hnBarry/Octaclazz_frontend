import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import Objective from './objective';
import ResultObj from './Resultquiz';
import { API_BASE_URL } from 'src/config';
import { useParams} from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Function from './Functions';
import { useSnackbar } from 'notistack';
import { useDispatch} from 'react-redux';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';


const useStyles = makeStyles((theme) => ({
  root: {
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
  const [fiftyanswer, setFiftyanswer] = useState(false);
  const params = useParams();
  const user = useSelector((state) => state.account.user);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/assessments/game/getStart',{
        Id:params.Id,
        userEmail:user.email
      })
      .then((response) => {
        if (isMountedRef.current) {
          setQuiz(response.data.moonquiz);
        }
      });
  }, [isMountedRef, params.Id, user.email]);


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
      if(quiz.learners[k].email === user.email)
        {
          myData = quiz.learners[k];    
        }
    }

    var timeRule = moment(quiz.dateline).fromNow();

    if(!score)
    {
      if(moment(quiz.dateline).format('YYYY-MM-DD HH:mm')<= moment().format('YYYY-MM-DD HH:mm'))
      { setScore(true);}
    }

    if(!score)
    {
      if(quiz.goalnum <= myData.questionstep)
      setScore(true);
    }

  const handleNext = (flag) => {

    if(flag===null)
    enqueueSnackbar("You must select one answer.", {
      variant: 'error',
    }); 
    else{
    axios
    .post(API_BASE_URL + 'assessments/assessments/game/nextStep',{
      Id:params.Id,
      userEmail:user.email,
      correct : flag
    })
    .then((response) => {
        setQuiz(response.data.moonquiz);
        setSelect(null);
        setShowanswer(false);
        setFiftyanswer(false);
    });
   }
  };

  const handleChange = (value) => {
    setSelect(value);
  }

  const buyfifty=() =>{
    if(user.wallet< quiz.fiftycost)
      enqueueSnackbar("You have not enough money.", {
        variant: 'error',
      }); 
    else{
      if(quiz.fiftynum <= myData.fiftybuynum)
        enqueueSnackbar("You have already purchased the maximum possible number.", {
          variant: 'error',
        }); 
      else{
        axios
        .post(API_BASE_URL + 'assessments/assessments/func/buyfifty',{
          Id:params.Id,
          email:user.email
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


  const usefifty=() =>{
 
    if( myData.fiftynum <= 0)
      {enqueueSnackbar("There is no fifty-fifty available.", {
        variant: 'error',
      }); 
    }
    else{
      axios
      .post(API_BASE_URL + 'assessments/assessments/func/usefifty',{
        Id:params.Id,
        email:user.email,
      })
      .then((response) => {
          setQuiz(response.data.moonquiz);
          setFiftyanswer(true);
      });
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
        {enqueueSnackbar("You have already purchased the maximum possible veto power.", {
          variant: 'error',
        }); 
      }
      else{
        axios
        .post(API_BASE_URL + 'assessments/assessments/func/buyVetoPower',{
          Id:params.Id,
          email:user.email,
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
 
      if( myData.restvetonum <= 0)
        {enqueueSnackbar("There is no veto power available.", {
          variant: 'error',
        }); 
      }
      else{
        axios
        .post(API_BASE_URL + 'assessments/assessments/func/useveto',{
          Id:params.Id,
          email:user.email,
        })
        .then((response) => {
            setQuiz(response.data.moonquiz);
            setShowanswer(true);
        });
      }
  }

  const handleskip = () => {
      axios
      .post(API_BASE_URL + 'assessments/assessments/func/skip',{
        Id:params.Id,
        email:user.email,
      })
      .then((response) => {
          setQuiz(response.data.moonquiz);
      });
  }


  return (
    <Grid
      className={classes.root}
    >

        <Box mb={3}>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            This is gamification objective assessment page.
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
                lg={12}
                xs={12}
                sm={12}
                md={12}
                style={{minheight:"200px"}}
              >
                <Function                
                mydata={myData} quiz={quiz}
                buyfifty ={buyfifty}
                usefifty = {usefifty}
                buyveto ={buyveto}
                useveto = {useveto}
                />
              </Grid>
            <Grid
                item
                lg={12}
                xs={12}
                sm={12}
                md={12}
                style={{minheight:"400px"}}
              >
                <Box p={3}>
                    <Objective
                    timeRule={timeRule}
                    rewardsscore={quiz.rewardsscore}
                    question={quiz.mcquestions[myData.questionstep]}
                    select = {select}
                    answerpenalty = {quiz.answerpenalty}
                    mydata = {myData}
                    goal = {quiz.goalnum}
                    showanswer = {showanswer}
                    fiftyanswer = {fiftyanswer}
                    onNext={handleNext}
                    handleChange1={handleChange}
                    handleskip = {handleskip}
                    />
                </Box>
              </Grid>
              </Grid>
            </Paper>
            }
           {(score) &&
           <>
           <ResultObj paramsId={params.Id} userEmail={user.email}/>
           </>
           }
    </Grid>
  );
}

export default ProjectCreateView;
