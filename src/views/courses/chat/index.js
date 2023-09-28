import React, {
  useEffect,
  useRef
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { getContacts } from 'src/actions/chatActions';
import Sidebar from './Sidebar';
import ThreadDetails from './ThreadDetails';
import ThreadNew from './ThreadNew';
import { io } from 'socket.io-client';
import { SOKET_SERVER } from 'src/config';
import {getThreads} from 'src/actions/chatActions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width:"100%"
  }
}));


const socket = io(SOKET_SERVER, {transports: ['websocket']});

function ChatView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { threadKey } = useParams();
  const pageRef = useRef(null);
  const {user} = useSelector((state) => state.account);
  const userEmail = user.email

 
 
   useEffect(() => {
    if(threadKey)
    {
      socket.emit("thread", {userEmail, threadKey});
     }
      
   },[threadKey, userEmail])


useEffect(() => {
  socket.emit("start",(userEmail));
},[userEmail])

  socket.off('getThreads').on('getThreads',async function (threads) {    
    await dispatch( getThreads(threads));
    socket.emit("start",(userEmail));
  });

  socket.off('getUsers').on('getUsers', function (users) { 
    dispatch( getContacts(users));
  });

  socket.off('findnew').on("findnew",function (Id) { 
    if(Id === threadKey)
   { 
    socket.emit("thread", {userEmail, threadKey});
   }
   else
    { socket.emit("start",(userEmail));}
  })

  socket.off('added').on('added', function () { 
    socket.emit("thread", {userEmail, threadKey});
  });

  const add = (userEmail,body) =>{
    socket.emit("addMessage", { userEmail, body, threadKey});
  }


  return (
    <Page
      className={classes.root}
      title="courses Chat"
      ref={pageRef}
    >
      <Sidebar containerRef={pageRef} />
      {threadKey ? <ThreadDetails add={add}/> : <ThreadNew /> }
    </Page>
  );
}

export default ChatView;
