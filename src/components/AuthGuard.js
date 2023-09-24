import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getNotifications } from 'src/actions/notificationsActions';

function AuthGuard({ children }) {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

 
  

  if (!account.user) {
    return <Redirect to="/login" />;
  }


  dispatch(getNotifications(account.user._id));

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
