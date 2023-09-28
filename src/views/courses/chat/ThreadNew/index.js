import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Divider,
  Hidden,
  IconButton,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import { openSidebar } from 'src/actions/chatActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark
  }
}));

function ThreadNew() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  return (
    <div className={classes.root}>
      <Hidden smUp>
        <Box
          px={2}
          py={1}
          bgcolor="background.default"
        >
          <IconButton
            className={classes.menuButton}
            edge="start"
            onClick={handleOpenSidebar}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <Divider />
      </Hidden>
    </div>
  );
}

export default ThreadNew;
