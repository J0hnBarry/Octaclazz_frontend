import React,{
  useState,
  useEffect,
  useCallback
}  from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RegisterForm from './RegisterForm';
import Header from './Header';
import { API_BASE_URL } from 'src/config';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark
  },
  container:{
    marginTop:"50px"
  }
}));

function RegisterView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [courses, setCourses] = useState();
  const params = useParams();

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'assessments/moonquiz/editquiz/' + params.Id)
      .then((response) => {
        if (isMountedRef.current) {
          setCourses(response.data.assessment);
        }
      });
  }, [isMountedRef, params.Id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!courses) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Editing Moon quiz"
    > 
       <Header />
      <Container className={classes.container} maxWidth="lg">
      
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h2"
              color="textPrimary"
              align='center'
            >
              Editing Moon quiz page
            </Typography>
            <Box mt={3}>
              <RegisterForm courses = {courses}/>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
