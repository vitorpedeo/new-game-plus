import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/home' component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
