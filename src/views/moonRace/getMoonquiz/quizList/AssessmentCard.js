import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark,
    width:"100%"
  },
  lesson:{
    fontSize:"20px",
    textAlign:"center",
    padding:"3px",
    paddingTop:"0px"
  },
  subject:{
    textAlign:"center",
    fontSize:"30px",
    width:"100%",
  }
}));

function ProjectCard({ course, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={2}>
        <img
          className={classes.media}
          alt="courses"
          src="/static/images/moonQuiz/selection.jpg"
        />
        <Box
          display="flex"
          mt={2}
        >
            <Grid
              className={classes.subject}
              color="textPrimary"
            >
              {course.coursename}
            </Grid>
        </Box>
      </Box>
      <Box className={classes.lesson}>
        <Typography color='primary' variant='h3'>
        Quiz name: {course.name}
        </Typography>
      </Box>
      <Box className={classes.lesson}>
        start time: {moment(course.starttime ).format('YYYY-MM-DD HH:mm')}       
      </Box>
      <Box className={classes.lesson}>
      end time: {moment(course.endtime ).format('YYYY-MM-DD HH:mm')}
      </Box>
      <Box className={classes.lesson}>
       Rewards: VN{" " + course.rewardsvn}, &nbsp; {course.rewardsfreeze + " streak freeze"} 
      </Box>
      <Box className={classes.lesson}>
       Lecturer:  {course.lecturer.username}
      </Box>
      <Box className={classes.lesson}>
       Goal number of questions:  {course.goalnum}
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        style={{textAlign:"center"}}
      >
       <Link
          color="textPrimary"
          component={RouterLink}
          to={'/app/assessments/moonquiz/test/' + course._id}
          variant="h4"
          style={{width:"100%"}}
        >
          Start quiz
        </Link>
      </Box>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired
};

export default ProjectCard;
