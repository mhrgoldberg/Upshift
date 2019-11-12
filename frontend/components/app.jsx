import React from "react";
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './user/signup_form_container'
import GreetingContainer from './session/greeting_container'
import Splash from "./splash";

const App = () => (
  <div>
    <header>
      <h1>upShift</h1>
      <GreetingContainer />
    </header>
    <div className="main-content">
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={Splash} />
    </div>
  </div>
);

export default App;