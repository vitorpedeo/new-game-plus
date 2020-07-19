import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getCookie } from '../../utils/cookies';

const PrivateRoute = (props) => {
  const token = getCookie('token');

  if (!token) {
    return <Redirect to='/login' />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
