import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Button,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:"lightgreen",
    color:theme.palette.secondary.dark,

  },
  button:{
    backgroundColor:theme.palette.background.default,
    marginLeft:"25%",
    marginTop:"10px",
    marginBottom:"10px"
  }
}));

function Filter({ className, course, ...rest }) {
  const classes = useStyles();
 
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={2}
        display="flex"
        alignItems="center"
        
      >
        <Typography
        variant='h1'
        style={{width:"100%"}}
        align="center"
        >
        {course.name}
        </Typography>
      </Box>
      <Divider />
      <Box
        p={2}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        {(course.learners) &&
         <Typography
          style={{width:"100%"}}
          align="center"
         >
        {course.learners.length}learners Enrolled <br />
       </Typography>}
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
    
      <Button className={classes.button} component={RouterLink} to="/app/courses/chat">Chat</Button>
      <Button className={classes.button} component={RouterLink} to="/app/assessments/assessments">take Assessments(1)</Button>
      </Box>
    </Card>
  );
}

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
