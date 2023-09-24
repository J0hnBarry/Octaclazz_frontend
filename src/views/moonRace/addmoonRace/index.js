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
import { useSelector } from 'react-redux';
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
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.account.user)

  const getCustomers = useCallback(() => {
    axios
      .get(API_BASE_URL + 'owncourses/' + user.email)
      .then((response) => {
        if (isMountedRef.current) {
          setCourses(response.data.courses);
        }
      });
  }, [isMountedRef, user.email]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!courses) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Create MoonRace"
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
              creating or adding page
            </Typography>
            <Box mt={3}>
              {(courses.length === 0) && <Typography
              gutterBottom
              variant="h2"
              color="textPrimary"
              align='center'
            >
              There is no your own course
            </Typography>}
            {(courses.length !== 0) && 
              <RegisterForm courses = {courses}/>
            }
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/app/assessments/moonrace/take"
              variant="body2"
              color="textSecondary"
            >
              Go to Moon quiz list
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
