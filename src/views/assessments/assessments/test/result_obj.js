import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

function ProjectDescription({
  className,
  score,
  ...rest
}) {
  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Objective Assessment Result
      </Typography>
      <Box mt={2}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
        >
          Here are your test results:
        </Typography>
      </Box>
      <Divider />
      <Typography
      variant="h3"
      color="textPrimary">
       Your multi choice assessment score is {score} mark(s);
       </Typography>
       <Divider />
      <Box
        mt={6}
        display="flex"
      >
        <Box flexGrow={1} />
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          size="large"
          component={RouterLink}
          to="/app/assessments/assessments"
        >
          Complete
        </Button>
      </Box>
    </form>
  );
}

ProjectDescription.propTypes = {
  className: PropTypes.string,
  score:PropTypes.number
};

export default ProjectDescription;
