import React, {useState} from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
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
import { useSelector } from 'react-redux';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function QuillEditorView() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const {user} = useSelector((state) => state.account);

  const onSave = () => {

    axios.post(API_BASE_URL + 'admin/pushnotification',  {
      creator:user._id,
      notice: value
    }).then((response) => {
      enqueueSnackbar(response.data.message, {
        variant: 'success'
      });
    });
  }

  return (
    <Page
      className={classes.root}
      title="Admin - push notification"
    >
      <Container maxWidth="lg">
        <Header />
        <Paper
          component={Box}
          mt={3}
        >
          <Card>
            <CardHeader title="Please Write your notice below." />
            <Divider />
          <Editor 
           onChange={(values) => setValue(values)}
           />
          </Card>
          <Divider />
          <Box display="flex">
            <Box flexGrow={1} />
            <Grid>
              <Button style={{margin:"20px", backgroundColor:"darkgreen"}}
              onClick={(e) => onSave()}
              >
                Done
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Page>
  );
}

export default QuillEditorView;
