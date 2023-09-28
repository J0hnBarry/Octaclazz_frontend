import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 50,
    paddingBottom: 50
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function Testimonials({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          &quot;A Gamified Learning Environment.
          <br />
          Powered by Octalysis!&quot;
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar src="/static/home/me.png" />
          <Box ml={2}>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              John Dah!!! @ Creator
              <Typography
                color="textSecondary"
                display="inline"
                component="span"
              >
                , 2022
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;
