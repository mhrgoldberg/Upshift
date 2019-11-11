import React from "react";
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import LoginFormContainer from './user/login_form_container'
import SignupFormContainer from './user/signup_form_container'
import GreetingContainer from './user/greeting_container'

const App = () => (
  <div>
    <header>
      <h1>upShift</h1>
      <GreetingContainer />
    </header>
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;