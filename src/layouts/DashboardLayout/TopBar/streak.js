import React,{useState} from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Typography,
  Box,
  Button,
  Backdrop,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Fade,
  Modal,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';


const useStyles = makeStyles((theme) => ({
  root: {
    color:"yellow"
  },
  modal:{
    position: 'absolute',
    maxWidth: 900,
    padding: theme.spacing(2, 4, 3),
  },
  paper:{
    display: 'flex',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:"darkgreen", 
    color:"white", 
    padding:"5px"
  }
}));

function Contacts() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const handleOpen = () => {
      setOpen(true)
  }
  const handleClose = () => {
      setOpen(false)
  }

  const streakFreeze = async() => {
    if(user.freeze <= 0)
    enqueueSnackbar("There is no enough number of 'Streak freeze'", {
      variant: 'error',
    }); 

    else{
      await axios.post(API_BASE_URL+'account/streakFreeze', { 
        userId: user._id
      })
        .then(async(response) => {
          enqueueSnackbar("One day of continuous freezing was successfully carried out.", {
            variant: 'success',
          }); 
          const newuser = await authService.loginInWithToken();
          await dispatch(setUserData(newuser)); 
        })
    }
}

  return (
      <div style={{marginRight:"30px"}}>
        {(user.role === "learner") &&
        <>
            <Button type="button" onClick={(e) => handleOpen()} className={classes.button}>
                Streak
            </Button>
            <Modal open={open}  className={classes.paper}
             closeAfterTransition
             BackdropComponent={Backdrop}
             BackdropProps={{
                 timeout: 500,
             }}
            ><Fade in={open}>
                   <Card className={classes.modal}>
                    <CardHeader title="Here is a trophy page related to the streaks benchmarks." />
                    <Divider />
                    <CardContent>  
                    {(user.earned) &&
                    <>
                      <Typography style={{color:"lightgreen"}} variant="h4">
                        Congratulations!<br />
                        You earned <Label color="warning">VN 700</Label> by keeping streak today.
                      </Typography>
                      <Box mt={2} mb={2}>
                        <Divider />
                      </Box> 
                    </>  
                    } 
                    {(user.getfreeze) &&
                     <>
                        <Typography style={{color:"lightgreen"}} variant="h4">
                          Congratulations!<br />
                          You got <Label color="warning">2 "Streak freeze"</Label> by keeping streak today.
                        </Typography>
                        <Box mt={2} mb={2}>
                          <Divider />
                        </Box> 
                      </>  
                      }                             
                      <Typography variant="h5">Users who keep a 7-day streak will earn 700 VNaira. <br /> This reward system will be looped for every 7-day streak kept.</Typography>
                      <Box mt={2} mb={2}>
                      <Divider />
                      </Box>
                      <Typography variant="h5">For each 30-day streak, users will be rewarded with two unit of an item called “Streak freeze.”  <br />A streak freeze is an item/feature that can and should enable users skip a day without losing their streak count. <br />
                      If you are unavoidably absent, press the "Streak Freeze"  button the day before to avoid losing your streak.
                      </Typography>
                      <Box mt={2} mb={2}>
                      <Divider />
                      </Box>
                      <Box display="flex">
                      <Typography variant="h4" >
                        Streak Count :<Label color='success'> {user.streaks}</Label>
                      </Typography>
                      <Box flexGrow={1} />
                      <Typography variant="h4" >
                        "Streak freeze" Number : <Label color='success'> {user.freeze}</Label>
                      </Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                      <Divider />
                      </Box>

                      <Box display="flex">
                      <Button className={classes.button} onClick={(e) => streakFreeze()}>
                            Streak freeze
                      </Button>
                        <Box flexGrow={1} />
                          <Button className={classes.button} onClick={(e) => handleClose()}>
                            close
                          </Button>
                      </Box>
                    </CardContent>
                </Card>
              </Fade>
            </Modal>
            </>
            }
        </div>
  );
}

export default Contacts;
