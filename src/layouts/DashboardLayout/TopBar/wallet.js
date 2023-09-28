import React from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    color:"yellow"
  }
}));

function Contacts() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);

  return (
    <>
    <Typography className={classes.root}>
            VN {user.wallet}
    </Typography>
    </>
  );
}

export default Contacts;
