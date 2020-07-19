import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { User } from './context/UserContext';
import { Game } from './context/GameContext';

import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';
import NewGame from './pages/NewGame';
import EditGame from './pages/EditGame';

const App = () => {
  return (
    <User>
      <Game>
        <ToastContainer autoClose={4000} />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/user/home' component={Home} />
            <PrivateRoute path='/user/search' component={Search} />
            <PrivateRoute path='/user/result/:id' component={GameDetails} />
            <PrivateRoute path='/user/new-game' component={NewGame} />
            <PrivateRoute path='/user/edit-game/:id' component={EditGame} />
          </Switch>
        </BrowserRouter>
      </Game>
    </User>
  );
};

export default App;
