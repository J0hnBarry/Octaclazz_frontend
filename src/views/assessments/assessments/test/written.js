import React,{
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

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
  onNext,
  ...rest
}) {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [isScore, setScore] = useState(true);
  const [question, setQuestion] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useIsMountedRef();
  const params = useParams();
  const user = useSelector((state) => state.account.user);
  const { enqueueSnackbar } = useSnackbar();


  const getCustomers = useCallback(() => {
    axios
      .post(API_BASE_URL + 'assessments/assessments/getScoreWri',{
        assessId:params.Id,
        learner:user.email
      })
      .then((response) => {
        if (isMountedRef.current) {
          setQuestion(response.data.question);
          setScore(response.data.flag);
        }
      });
  }, [isMountedRef, params.Id, user.email ]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const handleChange = (value) => {
 
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axios
      .post(API_BASE_URL + 'assessments/assessments/pushScoreWri',{
        assessId:params.Id,
        learner:user.email,
        content
      })
      .then((response) => {
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        }); 
        setSubmitting(false);
        if (onNext) {
          onNext("written");
        }
      })

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
       {(!isScore) &&
      <Grid>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Written assessment
      </Typography>
      <Typography
        variant="h4"
        color="error"
      >
        Warning:Don't refresh or navigate to another page. &nbsp; &nbsp; If you do, your score will be record as 0.
      </Typography>
      <Box mt={2}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
        >
          Please write correct answer!
        </Typography>
      <Typography
        variant="h4"
        color="primary"
      >
       QUESTION : &nbsp; {question}
      </Typography>
      </Box>
      <Paper
        variant="outlined"
        component={Box}
        mt={2}
      >
        <QuillEditor
          onChange={ handleChange}
          value={content}
          className={classes.editor}
        />
      </Paper>
      {error && (
        <Box mt={2}>
          <FormHelperText error>
            {FormHelperText}
          </FormHelperText>
        </Box>
      )}
      <Box
        mt={6}
        display="flex"
      >
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
        >
          Finish
        </Button>
      </Box>
      </Grid>}
      {(isScore) &&
        <Grid>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          You already have a score for this assessment.
        </Typography>
        </Grid>
      }
    </form>
  );
}

ProjectDescription.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
};

export default ProjectDescription;
