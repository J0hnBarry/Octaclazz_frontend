import React,{
  useState
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
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function UserDetails({
  className,
  rewardsvn,
  rewardsfreeze,
  timeRule,
  question,
  select,
  showanswer,
  onNext,
  handleChange1,
  ...rest
}) {
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {     
      if(select === question.crt)
         onNext(true);
      else{
        if(select === null)
        onNext(null);
        else
        onNext(false);
      }    
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
      <Grid>
      <Typography
        variant="h4"
        color="primary"
      >
      Rewards : <Label color="success"> VN{rewardsvn}</Label>, &nbsp; <Label color="success">{rewardsfreeze} "steak freeze"</Label>
      </Typography>
      <Typography
        variant="h4"
        color="error"
      >
        Remaining time: {timeRule}.
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
      <Box p={2}>
     <Typography
         variant="h4"
         color="textPrimary"
       >
         Question : {question.ques}
       </Typography>
       </Box>
         <Paper
           display="flex"
           alignItems="flex-start"
           mb={2}
           component={Box}
           elevation={select === question.ans1 ? 10 : 1}
         >
           <Radio
             checked={select  === question.ans1 }
             onClick={() => handleChange1( question.ans1)}
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
           elevation={select === question.ans2 ? 10 : 1}
         >
           <Radio
             checked={select  === question.ans2 }
             onClick={() => handleChange1( question.ans2)}
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
           elevation={select === question.ans3 ? 10 : 1}
         >
           <Radio
             checked={select  === question.ans3 }
             onClick={() => handleChange1( question.ans3)}
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
           elevation={select === question.ans4 ? 10 : 1}
         >
           <Radio
             checked={select  === question.ans4 }
             onClick={() => handleChange1( question.ans4)}
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
        {(showanswer) &&
        <Typography variant='h4'>
           Correct Answer : <Label color="error">{question.crt} </Label>
        </Typography>
        }
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
        >
          Next
        </Button>
      </Box>
      </Grid>
    </form>
  );
}

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default UserDetails;
