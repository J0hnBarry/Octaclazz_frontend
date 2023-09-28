import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Divider
} from '@material-ui/core';
import ReatHtmlParser from "react-html-parser";


const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:"30px",
    minHeight:"600px"
  }
}));

function Brief({ narrative, className, ...rest }) {
  const classes = useStyles();


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    ><CardHeader
       title="Narrative text" />
       <Divider />
      <CardContent >
     {ReatHtmlParser(narrative)}
      </CardContent>
    </Card>
  );
}

Brief.propTypes = {
  className: PropTypes.string
};

export default Brief;
