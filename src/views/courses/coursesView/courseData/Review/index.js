import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Grid,
  Divider,
  makeStyles
} from '@material-ui/core';
import ReatHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:"20px"
  }
}));

function Brief({ course, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
    {(course.review) && 
      <CardContent >       
         { course.review.map((review) => (
          <div key={review.id}>
          <Grid  style={{display:"flex"}} container spacing={3}>
            <Grid item lg={10} md={10} sm={10}>
            {ReatHtmlParser(review.review)}
            </Grid>
            <Grid item lg={2} md={2} sm = {2}>
             {review.learner}
             </Grid>            
          </Grid>
          <Divider />
          </div>
         ))}     
      </CardContent>     
      }
    </Card>

  );
}

Brief.propTypes = {
  course: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Brief;
