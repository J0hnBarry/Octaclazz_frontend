import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  IconButton,
  Input,
  Paper,
  SvgIcon,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import { Send as SendIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  }
}));

function MessageAdd({
  className,
  disabled,
  add,
  ...rest
}) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);
  const { enqueueSnackbar } = useSnackbar();
  const [body, setBody] = useState('');

  const handleChange = (event) => {
    event.persist();
    setBody(event.target.value);
  };

  const handleSend = async() => {
    try {
      if (!body) {
        return;
      } 
      const userEmail = user.email;

     add(userEmail, body);
      setBody('');

    } catch (error) {
      enqueueSnackbar('Ooops!', {
        variant: 'error'
      });
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Avatar
        alt="Person"
        src={user.avatar}
      />
      <Paper
        variant="outlined"
        component={Box}
        flexGrow={1}
        ml={2}
        p={1}
      >
        <Input
          className={classes.input}
          disableUnderline
          fullWidth
          value={body}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <span>
          <IconButton
            color="secondary"
            disabled={!body || disabled}
            onClick={handleSend}
          >
            <SvgIcon fontSize="small">
              <SendIcon />
            </SvgIcon>
          </IconButton>
        </span>
      </Tooltip>
     
    </div>
  );
}

MessageAdd.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool
};

MessageAdd.defaultProps = {
  className: '',
  disabled: false
};

export default MessageAdd;
