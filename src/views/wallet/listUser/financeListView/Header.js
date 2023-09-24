import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
        <Typography
          variant="h3"
          color="textPrimary"
        >
          All users related to finance
        </Typography>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
