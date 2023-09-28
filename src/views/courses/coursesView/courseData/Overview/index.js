import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
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
      <CardContent >
     {ReatHtmlParser( course.overview)}
      </CardContent>
    </Card>
  );
}

Brief.propTypes = {
  course: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Brief;
