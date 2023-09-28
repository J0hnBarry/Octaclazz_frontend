import React, {
  useState,
  useEffect,
  useCallback
}  from 'react';
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
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:"20px",
    height:"610px"
  }
}));

function Brief({ announ, className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [notice, setNotice] = useState(null);
  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'dashboard/notice')
      .then((response) => {
        if (isMountedRef.current) {
          setNotice(response.data.notice);
        }
      });
  }, [isMountedRef]);
  
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  
  if (!notice) {
    return null;
  }


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    ><CardHeader
       title="A new notice" />
       <Divider />
      <CardContent >
     {ReatHtmlParser( notice.content)}
      </CardContent>
    </Card>
  );
}

Brief.propTypes = {
  className: PropTypes.string
};

export default Brief;
