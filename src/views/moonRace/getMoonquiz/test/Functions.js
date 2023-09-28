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
  withStyles,
  Switch
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
    marginRight:"20px"
  },
  avatardisable:{
    width:"40px",
    height:"40px",
    borderRadius:"50%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    backgroundColor:"grey",
    marginRight:"20px"
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
  addtime,
  streakturbo,
  buyveto,
  useveto,
  ...rest
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    streakturbo(event.target.checked);
  }

  return (
    <Grid className={clsx(classes.root, className)} container spacing={2}>
      <Grid className={classes.items} item lg={4} md={4} sm={4} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
          <Label color="warning">{quiz.goalnum}</Label> <br /> Goal questions
        </Typography>
      </Grid>
      <Grid className={classes.items} item lg={4} md={4} sm={4} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
        <Label color="warning">{mydata.questionstep}</Label> <br />Presented questions
        </Typography>
      </Grid>
      <Grid className={classes.items} item lg={4} md={4} sm={4} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
        <Label color="warning">{mydata.correctanswernum}</Label> <br />Correct answers 
        </Typography>
      </Grid>

      <Grid className={classes.items} item lg={4} md={4} sm={4} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
          <Label color="warning">{mydata.buytimenum}</Label> <br /> Time of purchase(minute)
        </Typography>
      </Grid>
      <Grid className={classes.items} item lg={4} md={4} sm={4} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
        <Label color="warning">{mydata.streaknum}</Label> <br />Number of streak answer
        </Typography>
      </Grid>
      <Grid className={classes.items} item lg={4} md={4} sm={4} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
        <Label color="warning">{mydata.vetonum}</Label> <br />Number of veto boost 
        </Typography>
      </Grid>


      <Grid className={classes.items} item lg={6} md={6} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
         <Label color="success">Time purchase </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={quiz.timeflag? "enabled" : "disabled"}>
            <Grid className={quiz.timeflag? classes.avatar : classes.avatardisable} variant='outlined' />
          </TooltipStyle>
          {(quiz.timeflag) &&
          <TooltipStyle title={<><div> purchase price per minute : {quiz.timecost}</div><div>Maximum minutes to purchase: {quiz.timenumber} </div> </>}>
            <Button variant='outlined' style={{backgroundColor:"darkgreen", color:"white"}} onClick={(event) => addtime()}>
              Buy
            </Button>
          </TooltipStyle>
          }
        </Box>
      </Grid>
      <Grid className={classes.items} item lg={6} md={6} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
          <Label color="success">Streak turbo </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={quiz.streakflag? "enabled" : "disabled"}>
            <Grid className={quiz.streakflag? classes.avatar : classes.avatardisable} variant='outlined' />
          </TooltipStyle>
          {(quiz.streakflag) &&
            <>
            {(mydata.streakflag) &&
            <TooltipStyle title={<><div> Minimum number to get one streak turbo : {quiz.streakanswer}</div><div>Maximum streak turbo: {quiz.streakturbonum} </div>
            <div>Purchase price per streak turbo: {quiz.streakcost} </div></>}>
              <Switch checked={true} size="medium"  />
            </TooltipStyle>
            }
            {(!mydata.streakflag) &&
            <TooltipStyle title={<><div> Minimum number to get one streak turbo : {quiz.streakanswer}</div><div>Maximum streak turbo: {quiz.streakturbonum} </div>
            <div>Purchase price per streak turbo: {quiz.streakcost} </div></>}>
              <Switch defaultChecked={false} onChange={handleChange} size="medium"  />
            </TooltipStyle>
            }
            </>
          }
        </Box>
      </Grid>
      <Grid className={classes.items} item lg={5} md={5} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
          <Label color="success">
          Veto boost purchase
          </Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={(quiz.vetoflag && quiz.buyvetoflag)? "enabled" : "disabled"}>
            <Grid className={(quiz.vetoflag && quiz.buyvetoflag)? classes.avatar: classes.avatardisable} variant='outlined' />
          </TooltipStyle>
          {(quiz.vetoflag && quiz.buyvetoflag) &&
          <TooltipStyle title={<><div> The maximum number to purchase veto boost : {quiz.buyvetonum}</div><div>purchase price per unit veto boost: {quiz.buyvetocost} </div></>}>
            <Button variant='outlined' style={{backgroundColor:"darkgreen", color:"white"}} onClick={(event) => buyveto()}>
              Buy
            </Button>
          </TooltipStyle>
          }
        </Box>
      </Grid> 
      <Grid className={classes.items} item lg={2} md={2} sm={6} xs={6}>
      {(quiz.vetoflag && (quiz.buyvetoflag || quiz.streakvetoflag )) &&
        <Box display="flex" style={{justifyContent:"center"}}>
             <Button variant='outlined' style={{backgroundColor:"purple", color:"white", border:"solid 2px black", fontSize:"15px"}} onClick={(event) => useveto()}>
              Use <br /> 1 veto boost
            </Button>
        </Box>
         }
      </Grid>     
      <Grid className={classes.items} item lg={5} md={5} sm={6} xs={6}>
        <Typography color='primary' variant='h4' style={{textAlign:"center"}}>
        <Label color="success"> Veto boost by streak anwers </ Label>
        </Typography>
        <Box display="flex" style={{justifyContent:"center", padding:"5px", paddingTop:"25px"}}>
          <TooltipStyle title={(quiz.vetoflag && quiz.streakvetoflag)? <><div>enabled</div> <div>Minimum number of streak answers to get unit veto boost: {quiz.streakvetounitnum}</div>
          <div>Maximum number of veto boost to get by streak answers: {quiz.streakvetomaxnum} </div></> :"disabled"}>
            <Grid className={(quiz.vetoflag && quiz.streakvetoflag)? classes.avatar : classes.avatardisable} variant='outlined' />
          </TooltipStyle>
        </Box>
      </Grid>
    </Grid>
  );
}

ProjectDescription.propTypes = {
  className: PropTypes.string,
  quiz: PropTypes.object,
  mydata: PropTypes.object,
  addtime:PropTypes.func,
  buyveto:PropTypes.func
};

export default ProjectDescription;
