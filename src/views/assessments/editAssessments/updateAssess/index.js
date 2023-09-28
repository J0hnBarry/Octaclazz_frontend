import React,{
  useState,
  useEffect,
  useCallback
}  from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
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
      .get(API_BASE_URL + 'assessments/assessments/editAssess/' + params.Id)
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
      title="Editing Assessment"
    > 
       <Header />
      <Container className={classes.container} maxWidth="sm">
      
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h2"
              color="textPrimary"
              align='center'
            >
              Editing Assessment page
            </Typography>
            <Box mt={3}>
              <RegisterForm courses = {courses}/>
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/app/assessments/assessments/edit"
              variant="body2"
              color="textSecondary"
            >
              Go assessments list
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
