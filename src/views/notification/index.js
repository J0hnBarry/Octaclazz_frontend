import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import Page from 'src/components/Page';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    height: '100%',
    paddingTop: 50,
    paddingBottom: 50
  },
  header:{
    marginLeft:"35px"
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
  const{ notifications} = useSelector((state) => state.notifications);
  var courses = [], assessments = [], announcements =[];

  for(var k = 0 ; k < notifications.length-1 ; k++){
    if(notifications[k].course)
      courses.push({id:notifications[k]._id,course:notifications[k].course});
    if(notifications[k].assessment)
    assessments.push({id:notifications[k]._id, course:notifications[k].assessment.course, assess:notifications[k].assessment.name });
    if(notifications[k].announcement)
    announcements.push({id:notifications[k]._id, course: notifications[k].announcement});
  }

  return (
    <Page
      className={classes.root}
      title="notofication"
    > 
     <Box mt="0px" className={classes.header}>
      <Header/>
     </Box>
      <Box mt="0px">
        <Container style={{margin:0,width:"100%",maxWidth:'100%'}}>
          <Grid
            container
            style={{margin:0,width:"100%",height:"500px"}}
             spacing={10}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/notification/newCourse.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                {(courses.length ===0) &&
                <>
                 <Typography>
                 There is no new course data.
               </Typography>
                 <Box my={1}>
                 <Divider />
                 </Box>
                 </>
                }

                { (courses.length !==0) &&         
                courses.map((course) => (
                  <Box key={course.id}>
                  <Box my={2}
                  >
                    <Typography
                    color='error'
                    >
                      New course material &nbsp; ( &nbsp; "{ course.course}" &nbsp; ) &nbsp; is   created!
                    </Typography>
                  </Box>
                  <Box my={1}>
                  <Divider />
                  </Box>
                  </Box>
                ))}
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
              md={4}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/dashboards/assessments.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                {(assessments.length ===0) &&
                <>
                 <Typography>
                 There is no new assessment.
               </Typography>
                  <Box my={1}>
                  <Divider />
                  </Box>
                  </>
                }

                { (assessments.length !==0) &&         
                assessments.map((assess) => (
                  <Box key={assess.id}>
                  <Box my={2}
                  >
                    <Typography
                    color='error'
                    >
                      New assessment &nbsp; ( "{ assess.assess}" ) &nbsp; in "{ assess.course}"  is   created!
                    </Typography>
                  </Box>
                  <Box my={1}>
                  <Divider />
                  </Box>
                  </Box>
                ))}
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
              md={4}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/notification/announce.jpg"
                />
                <Box my={2}>
                  <Divider />
                </Box>
                {(announcements.length ===0) &&
                <>
                 <Typography>
                 There is no new announcement.
               </Typography>
                  <Box my={1}>
                  <Divider />
                  </Box>
                  </>
                }

                { (announcements.length !==0) &&         
                announcements.map((announ) => (
                  <Box key={announ.id}>
                  <Box my={2}                
                  >
                    <Typography
                    color='error'
                    >
                      New announcement of course ("{ announ.course}")  is   created!
                    </Typography>
                  </Box>
                  <Box my={1}>
                  <Divider />
                  </Box>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
                  component={RouterLink}
                  to="/app/courses"
                >
                   course
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}

export default PricingView;
