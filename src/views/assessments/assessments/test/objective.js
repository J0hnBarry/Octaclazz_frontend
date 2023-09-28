import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Grid,
  Paper,
  FormHelperText,
  Typography,
  Radio,
  Button,
  makeStyles,
  Divider
} from '@material-ui/core';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {},
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function UserDetails({
  className,
  onNext,
  onFinish,
  ...rest
}) {
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isScore, setScore] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const isMountedRef = useIsMountedRef();
  const params = useParams();
  const user = useSelector((state) => state.account.user);
  const { enqueueSnackbar } = useSnackbar();

  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/assessments/getScoreObj',{
        assessId:params.Id,
        learner:user.email
      })
      .then((response) => {
        if (isMountedRef.current) {
          setQuestions(response.data.questions);
          setScore(response.data.flag);
        }
      });
  }, [isMountedRef, params.Id, user.email]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);


  const handleChange1 = (select, id) => {
    setQuestions((prevValue) => {
      return prevValue.map((item, itemIndex) => {
        if (item._id === id) {
          return { ...item, selection: select };
        } else {
          return item;
        }
      });
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setScore(true);
      var sum = 0 ;
      var score = 0 ;
      for(var i = 0 ; i < questions.length ; i++)
      {
        if(questions[i].selection === questions[i].crt)
          sum += 5;
      }
      score = sum/(questions.length).toFixed(2);
      

      axios
      .post(API_BASE_URL + 'assessments/assessments/pushScoreObj',{
        assessId:params.Id,
        learner:user.email,
        score
      })
      .then((response) => {
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        }); 
        setSubmitting(false);

      onFinish(score);

      if (onNext) {
        onNext("written");
      }
      });
      
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      {(!isScore) &&
      <Grid>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Multi Choice Questions
      </Typography>
      <Typography
        variant="h4"
        color="error"
      >
        Warning:Don't refresh or navigate to another page. &nbsp; &nbsp; If you do, your score will be record as 0.
      </Typography>
      <Box mt={2}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
        >
          Select correct answers!
        </Typography>
      </Box>
      <Divider />
      {questions.map((question) => (
     <Box mt={5}
     key = {question._id}
     >
     <Typography
         variant="h4"
         color="textPrimary"
       >
         {question.ques}
       </Typography>
         <Paper
           display="flex"
           alignItems="flex-start"
           mb={2}
           component={Box}
           elevation={question.selection === question.ans1 ? 10 : 1}
         >
           <Radio
             checked={question.selection  === question.ans1 }
             onClick={() => handleChange1( question.ans1, question._id)}
           />
           <Box ml={2} style={{height:"42px",paddingTop:"10px"}}>
             <Typography
               gutterBottom
               variant="h5"
               color="textPrimary"
             >
               {question.ans1}
             </Typography>
           </Box>
         </Paper>
         <Paper
           display="flex"
           alignItems="flex-start"
           mb={2}
           component={Box}
           elevation={question.selection === question.ans2 ? 10 : 1}
         >
           <Radio
             checked={question.selection  === question.ans2 }
             onClick={() => handleChange1( question.ans2, question._id)}
           />
           <Box ml={2} style={{height:"42px",paddingTop:"10px"}}>
             <Typography
               gutterBottom
               variant="h5"
               color="textPrimary"
             >
               {question.ans2}
             </Typography>
           </Box>
         </Paper>

         <Paper
           display="flex"
           alignItems="flex-start"
           mb={2}
           component={Box}
           elevation={question.selection === question.ans3 ? 10 : 1}
         >
           <Radio
             checked={question.selection  === question.ans3 }
             onClick={() => handleChange1( question.ans3, question._id)}
           />
           <Box ml={2} style={{height:"42px",paddingTop:"10px"}}>
             <Typography
               gutterBottom
               variant="h5"
               color="textPrimary"
             >
               {question.ans3}
             </Typography>
           </Box>
         </Paper>
         <Paper
           display="flex"
           alignItems="flex-start"
           mb={2}
           component={Box}
           elevation={question.selection === question.ans4 ? 10 : 1}
         >
           <Radio
             checked={question.selection  === question.ans4 }
             onClick={() => handleChange1( question.ans4, question._id)}
           />
           <Box ml={2} style={{height:"42px",paddingTop:"10px"}}>
             <Typography
               gutterBottom
               variant="h5"
               color="textPrimary"
             >
               {question.ans4}
             </Typography>
           </Box>
         </Paper>
         
     </Box>
      ))}
      {error && (
        <Box mt={2}>
          <FormHelperText error>
            {error}
          </FormHelperText>
        </Box>
      )}
      <Box
        mt={6}
        display="flex"
      >
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
        >
          Finish
        </Button>
      </Box>
      </Grid>
      }
      {(isScore) &&
        <Grid>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          You already have a score for this assessment.
        </Typography>
        </Grid>
      }
    </form>
  );
}

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onFinish: PropTypes.func
};

export default UserDetails;
