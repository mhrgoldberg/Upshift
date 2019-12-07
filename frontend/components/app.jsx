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
import CreateWorkoutContainer from "./workouts/create_workout_container";
import EditWorkoutContainer from "./workouts/edit_workout_container";
import ShowWorkoutContainer from "./workouts/show_workout_container"
import WorkoutIndexContainer from "./workouts/workout_index_container";
import FeedContainer from "./feed/feed_container"

const App = () => (
  <div className="outside-div">
    <div className="main-content">
    <header>
      <NavBarContainer />
    </header>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <LoggedInRoute path="/route/new" component={CreateRouteContainer} />
        <LoggedInRoute path="/route/:routeId" component={ShowRouteContainer} />
        <LoggedInRoute path="/routes" component={RouteIndexContainer} />
        <LoggedInRoute path="/workout/new" component={CreateWorkoutContainer} />
        <LoggedInRoute path="/workout/edit/:workoutId" component={EditWorkoutContainer} />
        <LoggedInRoute path="/workout/:workoutId" component={ShowWorkoutContainer} />
        <LoggedInRoute path="/workouts" component={WorkoutIndexContainer} />
        <LoggedInRoute path="/feed" component={FeedContainer} />
        <AuthRoute exact path="/" component={Splash} />
        <Route component={NotFound} />
      </Switch>

    </div>
  </div>
);

export default App;