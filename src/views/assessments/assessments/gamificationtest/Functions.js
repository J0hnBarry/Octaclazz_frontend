import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  makeStyles,
  withStyles
} from '@material-ui/core';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  items:{
    marginTop:theme.spacing(4),
    marginBottom:theme.spacing(2),
    textAlign:"center"
  },
  avatar:{
    width:"40px",
    height:"40px",
    borderRadius:"50%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    backgroundColor:"red",
    marginRight:"10px"
  },
  avatardisable:{
    width:"40px",
    height:"40px",
    borderRadius:"50%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    backgroundColor:"grey",
    marginRight:"10px"
  },
  Tooltip:{
    fontSize:"30px"
  }
}));

const TooltipStyle = withStyles({
  tooltip: {
    fontSize: "20px",
    maxWidth:"700px"
  }
})(Tooltip)

function ProjectDescription({
  className,
  quiz,
  mydata,
  buyfifty,
  usefifty,
  buyveto,
  useveto,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root, className)} container spacing={2}>

      <Grid className={classes.items} item lg={2} md={2} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
         <Label color="success">Streak Answer </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={quiz.streakflag? <> <div>"enabled"</div><div>Number of streak answer to get bonus score : {quiz.streakanswer}</div><div>The bonus score of streak answer : {quiz.bonusscore}</div> </>: "disabled"}>
            <Grid className={quiz.streakflag? classes.avatar : classes.avatardisable} variant='outlined' />
          </TooltipStyle>
        </Box>
      </Grid>
      <Grid className={classes.items} item lg={2} md={2} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
         <Label color="success">Answer Penalty </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={quiz.answerpenalty? <> <div>"enabled"</div><div>Subtract score of wrong answer : {quiz.subtractscore}</div> </> : "disabled"}>
            <Grid className={quiz.answerpenalty? classes.avatar : classes.avatardisable} variant='outlined' />
          </TooltipStyle>
        </Box>
      </Grid>
     
      <Grid className={classes.items} item lg={4} md={4} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
          <Label color="success">
          Fifty-fifty
          </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={quiz.fiftyflag? "enabled" : "disabled"}>
            <Grid className={quiz.fiftyflag? classes.avatar: classes.avatardisable} variant='outlined' />
          </TooltipStyle>
          {quiz.fiftyflag &&
          <>
          <TooltipStyle title={<><div> The maximum number of 50-50 to purchase : {quiz.fiftynum}</div><div>The cost per unit 50-50: VN{quiz.fiftycost} </div></>}>
            <Button variant='outlined' style={{backgroundColor:"darkgreen", color:"white"}} onClick={(event) => buyfifty()}>
              Buy
            </Button>
          </TooltipStyle>
            <Button variant='outlined' style={{backgroundColor:"purple", color:"white", marginLeft:"5px"}} onClick={(event) => usefifty()}>
              Use
            </Button>
          </>
          }
        </Box>
      </Grid> 


      <Grid className={classes.items} item lg={4} md={4} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
          <Label color="success">
          Veto Power
          </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={(quiz.vetoflag && quiz.buyvetoflag)? "Veto power purchase : enabled" : "Veto power purchase : disabled"}>
            <Grid className={(quiz.vetoflag && quiz.buyvetoflag)? classes.avatar: classes.avatardisable} variant='outlined' />
          </TooltipStyle>
          <TooltipStyle title={(quiz.streakvetoflag && quiz.streakvetoflag)?<> <div> Veto power by streak answer : enabled</div><div>The streak answer number that can get 1 veto power : {quiz.streakvetounitnum}</div><div>The maximum number veto power that can get from streak answer : {quiz.streakvetomaxnum}</div> </>: "Veto power by streak answer : disabled"}>
            <Grid className={(quiz.streakvetoflag && quiz.streakvetoflag)? classes.avatar: classes.avatardisable} variant='outlined' />
          </TooltipStyle>
          {(quiz.vetoflag && quiz.buyvetoflag) &&
          <TooltipStyle title={<><div> The maximum number of veto power to purchase : {quiz.buyvetonum}</div><div>The cost per unit veto power to purchase: {quiz.buyvetocost} </div></>}>
            <Button variant='outlined' style={{backgroundColor:"darkgreen", color:"white"}} onClick={(event) => buyveto()}>
              Buy
            </Button>
          </TooltipStyle>
          }
          {quiz.vetoflag &&
            <Button variant='outlined' style={{backgroundColor:"purple", color:"white", marginLeft:"5px"}} onClick={(event) => useveto()}>
              Use
            </Button>
          }
        </Box>
      </Grid> 
    </Grid>
  );
}

ProjectDescription.propTypes = {
  className: PropTypes.string,
  quiz: PropTypes.object,
  mydata: PropTypes.object,
  buyveto:PropTypes.func
};

export default ProjectDescription;
