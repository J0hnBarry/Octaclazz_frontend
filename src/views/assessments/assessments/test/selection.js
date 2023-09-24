import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Paper,
  FormHelperText,
  Typography,
  Radio,
  Button,
  makeStyles
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const typeOptions = [
  {
    value: 'objective',
    title: 'objective assessment'
  },
  {
    value: 'written',
    title: 'written assessment'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function UserDetails({
  className,
  onNext,
  ...rest
}) {
  const classes = useStyles();
  const [type, setType] = useState(typeOptions[0].value);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (newType) => {
    setType(newType);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Do api call
      setSubmitting(false);

      if (onNext) {
        onNext(type);
      }
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
        <Typography
        variant="h3"
        color="error"
        style={{marginBottom:"30px"}}
      >
      Warning:Think carefully and choose! 
      Once you get a score, you can't get it again.
      </Typography>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Please select one option.
      </Typography>
      <Box mt={2}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
        >
          Objective assessment or written assessment?
        </Typography>
      </Box>
      <Box mt={2}>
        {typeOptions.map((typeOption) => (
          <Paper
            display="flex"
            alignItems="flex-start"
            p={2}
            mb={2}
            component={Box}
            elevation={type === typeOption.value ? 10 : 1}
            key={typeOption.value}
          >
            <Radio
              checked={type === typeOption.value}
              onClick={() => handleChange(typeOption.value)}
            />
            <Box ml={2}>
              <Typography
                gutterBottom
                variant="h5"
                color="textPrimary"
              >
                {typeOption.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      {error && (
        <Box mt={2}>
          <FormHelperText error>
            {error}
          </FormHelperText>
        </Box>
      )}
      <Box
        mt={6}
        display="flex"
      >
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
          component={RouterLink}
          to = "/app/assessments/assessments"
        >
          Back
        </Button>
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
        >
          Next
        </Button>
      </Box>
    </form>
  );
}

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

export default UserDetails;
