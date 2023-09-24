import React, {
  useState,
} from 'react';
import {
  Box,
  Grid,
  Divider,
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import Overview from './Overview';
import Curriculum from './Curriculum';
import Announcements from './Announcements';
import Review from './Review';
import Filelist from './filelist';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function ProjectDetailsView({course}) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('Announcements');
 
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'Curriculum', label: 'Curriculum' },
    { value: 'Announcements', label: 'Announcements' },
    { value: 'Review', label: 'Review' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Grid className={classes.root}  container spacing={5}>
      <Grid item lg={8} xl={8} xs={12}>
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3} >
          {currentTab === 'overview' && <Overview course={course} />}
          {currentTab === 'Curriculum' && <Curriculum course={course} />}
          {currentTab === 'Announcements' && <Announcements course={course}/>}
          {currentTab === 'Review' && <Review course={course} />}
        </Box>
        </Grid>
        <Grid  item lg={4} xl={4} xs={12}>
        <Filelist course={course}/>
        </Grid>
      </Grid>
  );
}

export default ProjectDetailsView;
