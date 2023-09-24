import React,{
  useState
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Paper,
  Grid,
  FormHelperText,
  Typography,
  Radio,
  Button,
  makeStyles,
  Divider
} from '@material-ui/core';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  items:{
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1),
    textAlign:"center"
  },
}));

function UserDetails({
  className,
  rewardsscore,
  timeRule,
  goal,
  question,
  mydata,
  select,
  showanswer,
  fiftyanswer,
  onNext,
  handleChange1,
  handleskip,
  answerpenalty,
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
      <Grid container spacing={1} alignItems="center">
        <Grid item lg={3} md={3} sm={6} xs={6} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
       <Label color="success"> score (per question)</Label> : <Label color="success"> {rewardsscore}</Label> 
        </Typography>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={6} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label color="warning"> Remaining time</Label>: <Label color="error"> {timeRule}</Label>
        </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label color="success"> goal question</Label>: <Label color="success"> {goal}</Label>
        </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> Presented question</Label>: <Label color="warning"> {mydata.questionstep}</Label>
        </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> Score</Label>: <Label color="error"> {mydata.gamescore}</Label>
        </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> correct</Label>: <Label color="error"> {mydata.correctanswer}</Label>
        </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> wrong</Label>: <Label color="error"> {mydata.wronganswer}</Label>
        </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> skip</Label>: <Label color="error"> {mydata.skipanswer}</Label>
        </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> 50-50</Label>: <Label color="error"> {mydata.fiftynum}</Label>
        </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4} className={classes.items}>
        <Typography
          variant="h4"
          color="primary"
        >
        <Label> veto power</Label>: <Label color="error"> {mydata.restvetonum}</Label>
        </Typography>
        </Grid>
      </Grid>
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
        {(fiftyanswer) &&
        <>
        {(question.crt === question.ans1) && 
        <Typography variant='h4'>
           Correct Answer : <Label color="error">{question.ans3} </Label> or <Label color="error">{question.crt} </Label>
        </Typography>
        }
        {(question.crt === question.ans2) && 
        <Typography variant='h4'>
           Correct Answer : <Label color="error">{question.ans1} </Label> or <Label color="error">{question.crt} </Label>
        </Typography>
        }
        {(question.crt === question.ans3) && 
        <Typography variant='h4'>
           Correct Answer : <Label color="error">{question.crt} </Label> or <Label color="error">{question.ans4} </Label>
        </Typography>
        }
        {(question.crt === question.ans4) && 
        <Typography variant='h4'>
           Correct Answer : <Label color="error">{question.crt} </Label> or <Label color="error">{question.ans2} </Label>
        </Typography>
        }
        </>
        }
        <Box flexGrow={1} />
        {(answerpenalty) &&
        <Button
          style={{marginRight:"20px"}}
          color="secondary"
          variant="contained"
          size="large"
          onClick={(event) => handleskip()}
        >
          I am not sure
        </Button>
        }
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

    </form>
  );
}

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default UserDetails;
