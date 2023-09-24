import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ChartIndex from './chartIndex';
import {Link as RouterLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Statistics from './Statistics';
import Notice from './announcement';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 50,
    paddingBottom: 50
  },
  container:{
    margin:0,
    padding: theme.spacing(4)
  },
  product: {
    position: 'relative',
    padding:"20px",
    textAlign:"center",
    cursor: 'pointer',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  productImage: {
    borderRadius: theme.shape.borderRadius,
      height: "250px",
      width:"100%",
  },
  chooseButton: {
    backgroundColor: theme.palette.common.white
  }
}));

function PricingView() {
  const classes = useStyles();
  const account = useSelector((state) => state.account);

  return (
    <Page
      className={classes.root}
      title="dashbord"
    >
          <Grid
           className={classes.container}
            container
            alignItems='center'
            justify="space-between"
          >
           
            <Grid
              item
              md={2}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                 className={classes.productImage}
                  alt="Product"        
                  src={account.user.avatar}
                />

                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
                  component={RouterLink}
                  to="/app/account"
                >
                  Profile
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/dashboards/course.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
                  component={RouterLink}
                  to="/app/courses"
                >
                  Courses
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/dashboards/assessment.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
                  component={RouterLink}
                  to="/app/assessments/assessments"                  
                >
                  Assessments
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/dashboards/movers & shakers.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
                  component={RouterLink}
                  to="/app/streakLeaders"   
                >
                  Movers 
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/dashboards/notifications.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
                  component={RouterLink}
                  to="/app/notification"   
                >
                  Notifications
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Statistics />
          <Grid
           className={classes.container}
            container
            spacing={2}
            alignItems='center'
            justify="space-between"
          >          
            <Grid
              item
              lg={7}
              md={7}
              xs={12}
            >
          <ChartIndex />   
          </Grid>
          <Grid
              item
              lg={5}
              md={5}
              xs={12}
            >
          <Notice />   
          </Grid>
          </Grid>
    </Page>
  );
}

export default PricingView;
