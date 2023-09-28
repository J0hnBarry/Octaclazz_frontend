import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Card,
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import List from './List';
import { API_BASE_URL } from 'src/config';
import Push from './PushQuestion';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CustomerListView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const params = useParams();
  const [assessments, setAssessments] = useState(null);
  const { enqueueSnackbar } = useSnackbar();


  const getCustomers = useCallback(() => {
    
    axios
      .get(API_BASE_URL + 'assessments/assessments/editQuestion/' + params.Id)
      .then((response) => {
        if (isMountedRef.current) {
          setAssessments(response.data.questions);
        }
      });
  }, [isMountedRef, params.Id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!assessments) {
    return null;
  }


  const onSubmitSuccess = (values) => {
    axios
      .post(API_BASE_URL + 'assessments/assessments/saveQuestion',{
        values,
        assessmentId:params.Id
      })
      .then((response) => {
        if(!response.data.success)
        {
          enqueueSnackbar(response.data.message, {
            variant: 'error'
          });
        }
        else{
          enqueueSnackbar(response.data.message, {
            variant: 'success'
          });
          setAssessments( response.data.questions);
          
        }
          
      });
  }

  const DeleteQuestion = (quesId) => {
    axios
    .post(API_BASE_URL + 'assessments/assessments/deleteQuestion',{
      assessmentId:params.Id,
      quesId
    })
    .then((response) => {
      enqueueSnackbar(response.data.message, {
        variant: 'success'
      });
       setAssessments(response.data.questions);
    });
   }

  return (
    <Page
      className={classes.root}
      title="Editing objective questions"
    >
      <Container maxWidth={false}>
        <Header />
        {assessments && (
          <Box mt={5}>
           <Grid container spacing={3}>
            <Grid item lg={8} md={12} sm={12}>
            <List Myassessments={assessments} onDelete={DeleteQuestion}/>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
            <Card style={{padding:"20px"}}>
            <Push onSubmitSuccess={onSubmitSuccess}/>
            </Card>
            </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
