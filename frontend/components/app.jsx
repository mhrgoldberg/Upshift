import React from "react";
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, LoggedInRoute } from '../util/route_util';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './user/signup_form_container'
import NavBarContainer from './nav_bar/nav_bar_container'
import CreateRouteContainer from './route/create_route_container'
import Splash from "./splash/splash";
import NotFound from './not_found'
import ShowRouteContainer from "./route/show_route_container";
import RouteIndexContainer from "./route/route_index_container";

const App = () => (
  <div className="outside-div">
    <div className="main-content">
    <header>
      <NavBarContainer />
    </header>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <LoggedInRoute path="/newroute" component={CreateRouteContainer} />
        <LoggedInRoute path="/showroute/:routeId" component={ShowRouteContainer} />
        <LoggedInRoute path="/routes" component={RouteIndexContainer} />
        <Route exact path="/" component={Splash} />
        <Route component={NotFound} />
      </Switch>

    </div>
  </div>
);

export default App;