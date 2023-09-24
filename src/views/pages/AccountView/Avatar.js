import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setUserData } from 'src/actions/accountActions';
import authService from 'src/services/authService';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:theme.palette.background.default
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100,
    margin:"15px",
    marginTop:"30px",
    marginBottom:"2px"
  },
  avatarSelect: {
    border:"solid 6px lightgreen",
    height: 100,
    width: 100,
    margin:"15px",
    marginTop:"30px",
    marginBottom:"2px"
  },
  tet:{
    color:theme.palette.primary.main
  },
  coin:{
    textAlign:"center"
  }
}));

function ProfileDetails({ className, ...rest }) {
  const classes = useStyles();
  const {user}  = useSelector((state) => state.account);
  const [select, setSelect] = useState(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const avatars = [
    { num:1, 'avt':"/static/images/avatars/a1.jpg", vn:600},
    { num:2, 'avt':"/static/images/avatars/a2.jpg", vn:700},
    { num:3, 'avt':"/static/images/avatars/a3.jpg", vn:800},
    { num:4, 'avt':"/static/images/avatars/a4.jpg", vn:1000},
    { num:5, 'avt':"/static/images/avatars/a5.jpg", vn:1000},
    { num:6, 'avt':"/static/images/avatars/a6.jpg", vn:1500},
    { num:7, 'avt':"/static/images/avatars/a7.jpg", vn:1500},
    { num:8, 'avt':"/static/images/avatars/a9.jpg", vn:2000},
    { num:9, 'avt':"/static/images/avatars/a10.jpg", vn:2000},
    { num:10, 'avt':"/static/images/avatars/a11.jpg", vn:2000},
    { num:11, 'avt':"/static/images/avatars/a12.jpg", vn:3000},
    { num:12, 'avt':"/static/images/avatars/a14.jpg", vn:3000},
    { num:13, 'avt':"/static/images/avatars/a15.jpg", vn:4000},
    { num:14, 'avt':"/static/images/avatars/a16.jpg", vn:4000},
    { num:15, 'avt':"/static/images/avatars/a17.jpg", vn:5000},
    { num:16, 'avt':"/static/images/avatars/a18.jpg", vn:5000},
    { num:17, 'avt':"/static/images/avatars/a19.jpg", vn:6000},
    { num:18, 'avt':"/static/images/avatars/a20.jpg", vn:6000}
  ];

const onSave = () => {
  if(select){

    if(user.wallet < avatars[select-1].vn)
    {
      enqueueSnackbar("Sorry! Your funds are insufficient.", {
        variant: 'error'
      });
    }
    else{
      axios.post(API_BASE_URL + 'account/profile/updateAvartar', {
        id:user._id,
        avatar:avatars[select-1].avt,
        wallet: avatars[select-1].vn
      }).then(async(res) => {
          const newuser = await authService.loginInWithToken();
          await dispatch(setUserData(newuser));
          enqueueSnackbar(res.data.message, {
            variant: 'success'
          });
     })
   }

 }
 else{
  enqueueSnackbar("Please choose one to change your avatar", {
    variant: 'error'
  });
 }
}

  return (
    <Grid className={clsx(classes.root, className)}
    {...rest}
    spacing={3}
     container
    display="inline"
          >
    <Grid
    item 
         lg={4}
        md={6}
        xl={3}
        xs={12}
      
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar
            className={classes.avatar}
            src={ (select)? avatars[select-1].avt : user.avatar}
          />
          <Typography
            className={classes.name}
            gutterBottom
            variant="h2"
            color="textPrimary"
          >
            {`${user.username}`}
          </Typography>
          <Box
          style={{paddingLeft:"5%"}}
           alignItems="left"
           textAlign="left"
          >
          <Typography
            color="textSecondary"
            variant="h4"
          >
            email : &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; {`${user.email}`}
          </Typography>
                    
          <Typography
            color="textSecondary"
            variant="h4"
          >
           location:&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; {`${user.location}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h4"
          >
           role:&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{`${user.role}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h4"
          >
           wallet:&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {`${user.wallet}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h4"
          >
           total spending:&nbsp;&nbsp; {`${user.totalSpending}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h4"
          >
           registered:&nbsp;&nbsp;&nbsp;  {moment(user.createdAt).format('YYYY-MM-DD')}
          </Typography>    
          </Box>
        </Box>
      </CardContent> 
    </Grid>
    <Grid 
      item
      lg={8}
      md={6}
      xl={9}
      xs={12}
    >
      <CardHeader className={classes.tet} title="Avatars" />
      <Divider />
    <Grid container >
      {avatars.map((avatar) => (
      <Grid item
      key={avatar.num}
      >
      <Avatar
        className={(select === avatar.num)? classes.avatarSelect : classes.avatar}
        src={avatar.avt} 
        onClick = {(e) => { setSelect(avatar.num)}}
      />
      <Typography
      className={classes.coin}
       color="textPrimary"
       variant="body1"
       >
        VN {avatar.vn}
       </Typography>
      </Grid>
      ))}
      </Grid>
      <Divider />
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          onClick = {(e) => onSave()}
        >
          Save Changes
        </Button>
        <Button
        style={{marginLeft:"15px"}}
          color="secondary"
          type="submit"
          variant="contained"
          onClick = {(e) => setSelect(null)}
          
        >
          Cancel
        </Button>
      </Box>
    </Grid>
    </Grid>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
