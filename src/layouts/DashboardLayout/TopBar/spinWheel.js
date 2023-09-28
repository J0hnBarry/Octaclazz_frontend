import React,{useState, useEffect} from 'react';
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
import { useSnackbar } from 'notistack';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import WheelComponent from 'react-wheel-of-prizes';
import moment from 'moment';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';
import { useDispatch } from 'react-redux';


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
    overflow: "scroll"
  },
  button:{
    backgroundColor:"darkgreen", 
    color:"white", 
    padding:"5px"
  }
}));


const segments = [
  'VN 50',
  'VN 70',
  'Streak freeze 1',
  'VN 25',
  'VN 300',
  'VN 40',
  'VN 65',
  'VN 120',
  'VN 5',
  'VN 1000',
  'VN 45',
  'VN 400',
  'VN 5000',
  'VN 75',
  'VN 500',
  'VN 30'

]
const segColors = [
  '#EE4040',
  '#F0CF50',
  '#815CD1',
  '#3DA5E0',
  '#34A24F',
  '#F9AA1F',
  '#EC3F3F',
  '#FF9000',
  'red',
  'lightgreen',
  'orange',
  'blue',
  '#815CD1',
  'pink',
  'green',
  'brown'
]

function Contacts() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [flag, setFlag] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

useEffect(() => {
  const newdate = new Date();

  if(moment(user.spin).format('YYYY-MM-DD') < moment(newdate).format('YYYY-MM-DD'))
  {
   setDisplay(true);
  }
  else{
   setDisplay(false);
  }

},[user.spin])

 const handleOpen = () => {
  setOpen(true)
}
const handleClose = () => {
  setOpen(false)
}

const recallStore = async() => {
  const newuser = await authService.loginInWithToken();
  await dispatch(setUserData(newuser)); 
  setOpen(false);
  setFlag(false);
}

const onFinished = async(winner) => {
  await axios.post(API_BASE_URL+'account/spinwheel', { 
    userId: user._id,
    winner
  })
    .then((response) => {
      enqueueSnackbar(response.data.message, {
        variant: 'success',
      }); 
      setFlag(true);
    });
}

  return (
   
      <div style={{marginRight:"30px"}}>
         {(user.role === "learner") &&
         <>
            <Button type="button" onClick={(e) => handleOpen()} className={classes.button}>
                Daily spin wheel
            </Button>
            <Modal open={open}  className={classes.paper}
             closeAfterTransition
             BackdropComponent={Backdrop}
             BackdropProps={{
                 timeout: 500,
             }}
            ><Fade in={open}>
                   <Card className={classes.modal}>
                    <CardHeader title="this is the wheel of fortune." />
                    <Divider />
                    <CardContent>  

                      <Typography style={{color:"lightgreen"}} variant="h4">
                        Gook Luck!
                      </Typography>
                      <Box mt={2} mb={2}>
                        <Divider />
                      </Box>                         
                      <Typography variant="h5">This spin can only be used once per day.</Typography>
                      <Box mt={2} mb={2}>
                      <Divider />
                      </Box>
                      {(display) && 
                      <Box justifyContent="center">
                      <Box style={{marginLeft:"12%", marginRight:"15%", height:"600px", overflow:"hidden"}}>
                      <WheelComponent
                        segments={segments}
                        segColors={segColors}
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor='black'
                        contrastColor='white'
                        buttonText='Spin'
                        isOnlyOnce={true}
                        size={220}
                        upDuration={100}
                        downDuration={500}
                        fontFamily='Arial'
                      />
                      </Box>
                    </Box>
                      }
                      {(!display) &&
                        <Typography variant="h5">You have already received reward today.</Typography>
                      }                     
                      <Box mt={2} mb={2}>
                      <Divider />
                      </Box>                     
                      {(!flag) &&  
                      <Box display='flex'>
                      <Box flexGrow={1} />                  
                      {(display) &&
                       <Button className={classes.button} onClick={(e) => handleClose()}>
                           Save
                       </Button>                    
                      }
                      {(!display) && 
                        <Button className={classes.button} onClick={(e) => handleClose()}>
                          close
                        </Button>
                      }
                      </Box>
                    }
                    {(flag) &&
                    <Box display='flex'>
                    <Box flexGrow={1} /> 
                      <Button className={classes.button} onClick={(e) => recallStore()}>
                          Ok
                      </Button>
                    </Box>
                    }                   
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
