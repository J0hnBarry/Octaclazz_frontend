import React from 'react';
import {
  Link as RouterLink
} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  useSelector
} from 'react-redux';
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  makeStyles
} from '@material-ui/core';
import{AlertCircle} from 'react-feather'


const useStyles = makeStyles((theme) => ({
  root: {},
  searchContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  contactAvatar: {
    height: 32,
    width: 32
  }
}));

function ThreadList({ className, ...rest }) {
  const classes = useStyles();
  const { contacts } = useSelector((state) => state.chat);


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
        <div className={classes.searchContainer}>

          <Box mt={2}>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              Contacts
            </Typography>
            <List>
              {contacts.map((contactId) => (
                  <ListItem
                    button
                    component={RouterLink}
                    key={contactId.id}
                    to={`/app/courses/chat/${contactId.id}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={contactId.avatar}
                        className={classes.contactAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={contactId.username}
                      primaryTypographyProps={{
                        noWrap: true,
                        variant: 'h6',
                        color: 'textPrimary'
                      }}
                    />
                      <ListItemText
                      primary={contactId.role}
                      primaryTypographyProps={{
                        noWrap: true,
                        variant: 'h6',
                        color: 'textPrimary'
                      }}
                    />
                    {(contactId.new) &&
                   <Chip
                      size="small"
                      icon={<AlertCircle color='red' fontWeight='bold'/>}                    
                      // label="Updated"
                    />
                  }
                  </ListItem>         
                ))}
            </List>
          </Box>

        </div>
    </div>
  );
}

ThreadList.propTypes = {
  className: PropTypes.string
};

export default ThreadList;
