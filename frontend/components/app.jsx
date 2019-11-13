import React from "react";
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './user/signup_form_container'
import NavBarContainer from './nav_bar/nav_bar_container'
import Splash from "./splash";

const App = () => (
  <div>
    <header>
      <NavBarContainer />
    </header>
    <div className="main-content">
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={Splash} />
    </div>
  </div>
);

export default App;