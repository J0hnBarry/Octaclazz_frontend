import React, {
  useEffect,
  useRef
} from 'react';
import {
  useSelector
} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Divider,
  makeStyles
} from '@material-ui/core';
import Message from '../Message';
import MessageAdd from '../MessageAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark
  }
}));

function ThreadDetails({add}) {
  const classes = useStyles();
  const {threads} = useSelector((state) => state.chat);
  const messagesRef = useRef(null);

  function scrollMessagesToBottom() {
    if (messagesRef.current) {
      // eslint-disable-next-line no-underscore-dangle
      messagesRef.current._container.scrollTop = messagesRef.current._container.scrollHeight;
    }
  }


  useEffect(() => {
    if (threads) {
      scrollMessagesToBottom();
    }
    // eslint-disable-next-line
  }, [threads]);

  if (!threads) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Divider />
      <Box
        flexGrow={1}
        p={2}
        ref={messagesRef}
        component={PerfectScrollbar}
        options={{ suppressScrollX: true }}
      >
 
        {threads.chating.length > 0 && threads.chating.map((thread) => (
          <Message
            key={thread._id}
            thread={thread}
            name = {threads.name}
            avatar = {threads.avatar}
          />
        ))}
      </Box>
      <Divider />
      <MessageAdd add={add}/>
    </div>
  );
}

export default ThreadDetails;
