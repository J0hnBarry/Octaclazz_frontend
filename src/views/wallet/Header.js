import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Hidden,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    width: '100%',
    maxHeight: 200
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            variant="overline"
            color="textSecondary"
          >
            wallet
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Hi,
            {' '}
            {user.username}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >
            Your financial relationship is as follows
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid
            item
            md={6}
          >
            <img
              alt="Cover"
              className={classes.image}
              src="/static/images/wallet/walletHeader.svg"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
