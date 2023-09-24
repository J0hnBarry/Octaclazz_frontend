import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp'
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import QuillEditor from 'src/components/QuillEditor';

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0,
  },
  editor:{
    '& .ql-editor': {
      height: 200
    }
  }
}));

var string = API_BASE_URL + '/uploads/courses/';
var num = string.length -5 + 37; 
var review = '';


  function Members({ course, className, ...rest }) {
  const classes = useStyles();
  const [enrolls, setEnrolls] = useState(false);
  const user = useSelector((state) => state.account.user);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{

    if(course.learners)
    for(var k = 0 ; k< course.learners.length ; k++)
      if(course.learners[k] === user.email)
      setEnrolls(true);
    },[course,user.email])

 const enroll = () => {
  axios
  .post(API_BASE_URL + 'courses/enroll', {
    learner: user.email,
    courseId : course._id
  } )
  .then((response) => {
    if(response.data.success)
      {
        setEnrolls(true);
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        });  
      }
    else{
      enqueueSnackbar(response.data.message, {
        variant: 'error',
      });  
    }

  });
}

const pushReview = ()=>{

  axios
  .post(API_BASE_URL + 'courses/pushreview', {
    learner: user.username,
    courseId : course._id,
    review : review
  } )
  .then((response) => {
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        });  
  });

}


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        className={classes.header}
        title="Reference files"
        titleTypographyProps={{
          variant: 'overline'
        }}
      />
      <Divider />
      {(enrolls) &&
      <CardContent className={classes.content}>
        {(course.origins) && 
        <Grid >
          {course.files.map((file) => (
             <Link
               key={file}
              href= {file}  
              >
              <Typography style={{justifyContent:"center", marginTop:"5px"}}>
               {file.slice(num)}{" "} <DownloadIcon style={{marginTop:"5px"}}/>
              </Typography>
              </Link>
          ))}
        </Grid>
        }
      </CardContent>
      }
      {(!enrolls) && <Typography style={{padding:'10px'}}>Please enroll to learn this coures</Typography>}
      <Divider />
      <CardActions>
        <Button fullWidth style={{backgroundColor:'lightblue'}} onClick={(e)=> {enroll()}} >
          Enroll
        </Button>
      </CardActions>
      <CardHeader
        className={classes.header}
        title="Your Review"
        titleTypographyProps={{
          variant: 'overline'
        }}
      />
      {(enrolls) &&
      <CardContent>
      <Paper variant="outlined">
      <QuillEditor
        className={classes.editor}
        onChange={(value) => {review = value}}
      />
      </Paper>
       <Button fullWidth onClick={(e)=> {pushReview()}} >
          Sending Review
        </Button>
      </CardContent>
      }
    </Card>
  );
}

Members.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired
};

export default Members;
