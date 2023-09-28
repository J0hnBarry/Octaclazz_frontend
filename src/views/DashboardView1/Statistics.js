import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { API_BASE_URL } from 'src/config';

const useStyles = makeStyles((theme) => ({
  root: {padding:theme.spacing(5)},
  item: {
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor:theme.palette.background.default
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  }
}));

function Statistics({ className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [statistics, setStatistics] = useState(null);

  const getStatistics = useCallback(() => {
    axios
      .get(API_BASE_URL + 'dashboard/statistics')
      .then((response) => {
        if (isMountedRef.current) {
          setStatistics(response.data.statistics);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  if (!statistics) {
    return null;
  }

  return (

      <Grid
       className={clsx(classes.root, className)}
       {...rest}
        alignItems="center"
        container
        justify="space-between"
      >

        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
            {statistics.users}
            <div style={{width:"20px"}}></div>
            Users
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
           total users 
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
            {statistics.lecturers}
            <div style={{width:"20px"}}></div>
            Lecturers
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
           total lecturers 
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
            {statistics.learners}
            <div style={{width:"20px"}}></div>
            learners
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
            Total learners
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
           {statistics.courses}
            <div style={{width:"20px"}}></div>
            Courses
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
            Total courses
          </Typography>
        </Grid>

      </Grid>
  );
}

Statistics.propTypes = {
  className: PropTypes.string
};

export default Statistics;
