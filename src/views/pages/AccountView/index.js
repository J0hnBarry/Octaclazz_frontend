import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Avatar from './Avatar';
import Shuttle from './Shuttle';
import Security from './Security';
import Profile from './Profile.js';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AccountView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('Image');
  const tabs = [
    { value: 'Image', label: 'Image/Avatar setting' },
    { value: 'profile', label: 'Account/Info' },
    { value: 'password', label: 'Password setting' },
    { value: 'shuttle', label: 'Shuttle setting' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
            className={classes.tabs}
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
        <Box mt={3}>
          {currentTab === 'Image' && <Avatar />}
          {currentTab === 'shuttle' && <Shuttle />}
          {currentTab === 'profile' && <Profile />}
          {currentTab === 'password' && <Security />}
        </Box>
      </Container>
    </Page>
  );
}

export default AccountView;
