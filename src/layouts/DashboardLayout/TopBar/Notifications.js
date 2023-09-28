import React, {
  useRef,
  useState
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  useSelector
} from 'react-redux';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Bell as BellIcon,
  MessageCircle as MessageIcon,
  CheckCircle,
  BookOpen,
  DollarSign
} from 'react-feather';



const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  tip:{
    position:'absolute',
    marginRight:"-15px",
    marginTop:"-15px",
    color:"black",
    width:"15px",
    height:"25px",
    borderRadius:"3px",
    backgroundColor:"red",

  }
}));

function Notifications() {
  const classes = useStyles();
  const{ notifications} = useSelector((state) => state.notifications);
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  var course = 0, assess = 0, announ =0;

 if(notifications.length>0)
{  for(var k = 0 ; k < notifications.length-1 ; k++){
    if(notifications[k].course)
      course +=1;
    if(notifications[k].assessment)
      assess +=1;
    if(notifications[k].announcement)
       announ +=1;
  }
var borrow = notifications[notifications.length - 1].borrows

}

if(notifications.length === 0)
 return null;



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          ref={ref}
          onClick={handleOpen}
        > {((notifications.length -1 + borrow)!== 0) &&         
          <Typography className={classes.tip}>
             {notifications.length -1 +borrow}
        </Typography>
          }
          <SvgIcon>    
            <BellIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography
            variant="h5"
            color="textPrimary"
          >
            Notifications
          </Typography>
        </Box>
        {(notifications.length - 1 + borrow) === 0 ? (
          <Box p={2}>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              There are no notifications
            </Typography>
          </Box>
        ) : (
            <List
              className={classes.list}
              disablePadding
            >
              {(course !== 0) &&
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    to="/app/notification"
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <BookOpen />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="New courses created!"
                      primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                      secondary={course + "new course"}
                    />
                  </ListItem>
                  }
                  {(assess !== 0) &&
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    to="/app/notification"
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <CheckCircle />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="New assessments created!"
                      primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                      secondary={assess + "new assessments"}
                    />
                  </ListItem>
                  }
                  {(announ !== 0) &&
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    to="/app/notification"
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <MessageIcon />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="New announcement created!"
                      primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                      secondary={announ + "new announcement"}
                    />
                  </ListItem>
                  }
                   {(borrow !== 0) &&
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    to="/app/account/wallet"
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <DollarSign />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="You have some borrows!"
                      primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                      secondary={borrow + "borrows"}
                    />
                  </ListItem>
                  }
            </List>
        )}
      </Popover>
    </>
  );
}

export default Notifications;
