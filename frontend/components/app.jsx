import React from "react";
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './user/signup_form_container'
import NavBarContainer from './nav_bar/nav_bar_container'
import Splash from "./splash/splash";
import NotFound from './not_found'

const App = () => (
  <div className="outside-div">
    <div className="main-content">
    <header>
      <NavBarContainer />
    </header>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route exact path="/" component={Splash} />
        <Route component={NotFound} />
      </Switch>

    </div>
  </div>
);

export default App;