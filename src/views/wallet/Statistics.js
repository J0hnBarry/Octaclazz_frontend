import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
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
  const [statistics, setStatistics] = useState([]);
  const {user} = useSelector((state) => state.account);

  const getStatistics = useCallback(() => {
    axios
      .get(API_BASE_URL + 'account/wallet/statistics/' + user._id)
      .then((response) => {
        if (isMountedRef.current) {
          setStatistics(response.data.statistics);
        }
      });
  }, [isMountedRef, user._id]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  if (!statistics) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
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
            {statistics.loans}
            <div style={{width:"20px"}}></div>
            VN
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
            Total Loans
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
            {statistics.gifts}
            <div style={{width:"20px"}}></div>
            VN
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
           total gifts(sent) 
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
            {statistics.borrows}
            <div style={{width:"20px"}}></div>
            VN
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
           total borrows 
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
            {statistics.receives}
            <div style={{width:"20px"}}></div>
            VN
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
            Total gifts(received)
          </Typography>
        </Grid>

      </Grid>
    </Card>
  );
}

Statistics.propTypes = {
  className: PropTypes.string
};

export default Statistics;
