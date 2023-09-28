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
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

function ProjectDescription({
  className,
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
        Your written assessment has done completely!
      </Typography>
      <Box mt={2}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
        >
          Please wait for the result!
        </Typography>
      </Box>
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
};

export default ProjectDescription;
