import React, {
  useState,
  useEffect,
  useCallback
}  from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Container,
  Paper,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import Editor from './editor';
import { API_BASE_URL } from 'src/config';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import Header from './Header';
import {Link as RouterLink, useParams} from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));




function QuillEditorView() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [assessments, setAssessments] = useState(null);
  const isMountedRef = useIsMountedRef();
  const params = useParams();


  const getCustomers = useCallback(() => {
    
    axios
      .get(API_BASE_URL + 'assessments/moonquiz/getnarrative/' + params.Id)
      .then((response) => {
        if (isMountedRef.current) {
          setAssessments(response.data.narrative);
        }
      });
  }, [isMountedRef, params.Id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!assessments) {
    return null;
  }

  const onSave = () => {

    axios.post(API_BASE_URL + 'assessments/moonquiz/saveNarrative',  {
      id:params.Id,
      narrative: value
    }).then((response) => {
      enqueueSnackbar(response.data.message, {
        variant: 'success'
      });
    });
  }

  return (
    <Page
      className={classes.root}
      title="Edit narrative text"
    >
        <Header />
        <Container maxWidth="lg" >
        <Paper
          component={Box}
          mt={10}
        >        
          <Card>
            <CardHeader title="Please write(or edit) narrative text below." />
            <Divider />
          <Editor 
          content={assessments}
           onChange={(values) => setValue(values)}
           />
          </Card>
          <Divider />
          <Box display="flex">
             <Button style={{margin:"20px", backgroundColor:"darkgreen"}}
              component={RouterLink}
              to="/app/assessments/moonrace/edit"
              >
                Back
              </Button>
            <Box flexGrow={1} />
              <Button style={{margin:"20px", backgroundColor:"darkgreen"}}
              onClick={(e) => onSave()}
              >
                Save
              </Button>
          </Box>         
        </Paper>
        </Container>
    </Page>
  );
}

export default QuillEditorView;
