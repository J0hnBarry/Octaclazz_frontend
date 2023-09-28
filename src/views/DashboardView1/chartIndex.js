import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import Chart from './Chart';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 500
  }
}));

function FinancialStats({ className, ...rest }) {
  const classes = useStyles();

  const isMountedRef = useIsMountedRef();
  const [courses, setCourses] = useState(null);
  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'dashboard/courses')
      .then((response) => {
        if (isMountedRef.current) {
          setCourses(response.data.courses);
        }
      });
  }, [isMountedRef]);
  
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  
  if (!courses) {
    return null;
  }

  var stats = [];
  var labels = [];

  for(var k = 0 ; k < courses.length ;  k++)
  {
    labels.push(courses[k].name);
    stats.push(courses[k].learners.length);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Number of learners by course"
      />
      <Divider />
      <PerfectScrollbar>
        <Box
          minWidth={750}
          pt={4}
          pr={2}
          pl={2}
          pb={3}
        >
          <Chart
            className={classes.chart}
            data={stats}
            labels={labels}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

FinancialStats.propTypes = {
  className: PropTypes.string
};

export default FinancialStats;
