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
      <Box p={3}>
        <img
          className={classes.media}
          alt="courses"
          src="/static/images/assessment/assessmentList.jpg"
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
        Assessment name: {course.name}
      </Box>
      <Box className={classes.lesson}>
        Dateline: {moment(course.dateline ).format('MMMM Do YYYY')}
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
          to={'/app/assessments/assessments/test/' + course._id}
          variant="h4"
          style={{width:"100%"}}
        >
          Take Assessment
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
