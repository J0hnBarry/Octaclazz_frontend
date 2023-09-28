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
  userEmail,
  ...rest
}) {
  const classes = useStyles();
  const [quiz, setQuiz] = useState(null);
  const isMountedRef = useIsMountedRef();

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/assessments/game/getStart',{
        Id:paramsId,
        userEmail
      })
      .then(async(response) => {
        if (isMountedRef.current) {
          setQuiz(response.data.moonquiz);
        }
      });
  }, [isMountedRef,paramsId,userEmail]);


  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if(!quiz)
  return null;

  var myData = [];
  for(var k = 0; k < quiz.learners.length ; k++)
  {
    if(quiz.learners[k].email === userEmail)
      myData = quiz.learners[k];
  }

  return (
      <Card
      className={clsx(classes.root, className)}
      {...rest}
      >

     <CardHeader title="Your score is as follows!" />
      <Divider />

          <Grid style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
             <Box mt={3}>
              <Typography variant="h3" style={{textAlign:"center"}}>The gamification assessment  has done.</Typography>
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
            Your score: <Label color='warning'> { myData.gamescore}</Label> 
            </Typography>
            <Typography color='primary' variant='h3'>
            Correct answer: <Label color='warning'> { myData.correctanswer}</Label>
            </Typography>
            <Typography color='primary' variant='h3'>
            Wrong answer : <Label color='warning'> { myData.wronganswer}</Label>&nbsp; Skip answer : <Label color='warning'> { myData.skipanswer}</Label>
            </Typography>
          </Box>
        </Grid>

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
          to="/app/assessments/assessments"
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
