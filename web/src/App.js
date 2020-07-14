import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/user/home' component={Home} />
        <Route path='/user/search' component={Search} />
        <Route path='/user/result/:id' component={GameDetails} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
