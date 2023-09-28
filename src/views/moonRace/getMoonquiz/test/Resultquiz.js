import React,{
  useState,
  useEffect,
  useCallback
}  from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import Label from 'src/components/Label';
import { useDispatch} from 'react-redux';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 400,
    backgroundColor: theme.palette.background.dark,
    width:"100%"
  },
  lesson:{
    fontSize:"20px",
    textAlign:"center",
    padding:"15px",
  },
  subject:{
    textAlign:"center",
    fontSize:"30px",
    width:"100%",
  }
}));

function ProjectDescription({
  className,
  paramsId,
  userId,
  ...rest
}) {
  const classes = useStyles();
  const [quiz, setQuiz] = useState(null);
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/moonquiz/getStart',{
        Id:paramsId,
        userId:userId
      })
      .then(async(response) => {
        if (isMountedRef.current) {
          setQuiz(response.data.moonquiz);
          const newuser = await authService.loginInWithToken();
          await dispatch(setUserData(newuser));
        }
      });
  }, [isMountedRef,paramsId,userId, dispatch]);


  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if(!quiz)
  return null;

  var myData = [];
  for(var k = 0; k < quiz.learners.length ; k++)
  {
    if(quiz.learners[k].id._id === userId)
      myData = quiz.learners[k];
  }

  return (
      <Card
      className={clsx(classes.root, className)}
      {...rest}
      >

     <CardHeader title="Your Moon quiz has done!" />
      <Divider />
     {(quiz.goalnum !== myData.correctanswernum) &&
     <Grid style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
      <Box mt={3}>
      <Typography variant="h3" style={{textAlign:"center"}}>You did not successfully reach the moon</Typography>
      </Box>
      <Box p={2}>
            <img
              className={classes.media}
              alt="courses"
              src="/static/images/moonQuiz/over.jpg"
            />
          </Box>
      </Grid>
      }
      {(quiz.goalnum === myData.correctanswernum) &&
          <Grid style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
             <Box mt={3}>
              <Typography variant="h3" style={{textAlign:"center"}}>You successfully reached the moon</Typography>
             </Box>
          <Box p={2}>
            <img
              className={classes.media}
              alt="courses"
              src="/static/images/moonQuiz/congrate.jpg"
            />
          </Box>
          <Box className={classes.lesson}>
            <Typography color='primary' variant='h3'>
            Rewards: <Label color='warning'> VN { quiz.rewardsvn}</Label> &nbsp; <Label color='warning'>{quiz.rewardsfreeze + " streak freeze"} </Label>
            </Typography>
          </Box>
        </Grid>
      }
      <Box
        m={3}
        display="flex"
      >
        <Box flexGrow={1} />
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={RouterLink}
          to="/app/assessments/moonrace/take"
        >
          Finish
        </Button>
      </Box>
      </Card>
  );
}

ProjectDescription.propTypes = {
  className: PropTypes.string,
};

export default ProjectDescription;
