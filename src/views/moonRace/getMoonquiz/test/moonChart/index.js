import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Grid,
  Divider,
  makeStyles
} from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {marginTop:"20px"},
  chart: {
     height: 700
  }
}));

function FinancialStats({ className, mydata, max, ...rest }) {
  const classes = useStyles();

  var stats = [];
  var labels = [];
  var avatars=[];

  for(var k = 0 ; k < mydata.length ;  k++)
  {
    labels.push(mydata[k].id.username);
    stats.push(mydata[k].correctanswernum);
    avatars.push({src:mydata[k].id.shuttle, width:45, height:70});
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="The progress of the moon quiz"
      />
      <Divider />
        <Grid style={{height:"150px"}} >
        <img alt="there is no" src='/static/images/moonQuiz/goal.jpg' width="100%" height="100%"/>
      </Grid>
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
            avatars={avatars}
            max={max}
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
