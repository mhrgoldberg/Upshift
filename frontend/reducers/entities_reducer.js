import { combineReducers } from "redux";
import usersReducer from "./users/users_reducer";
import routesReducer from "./routes/routes_reducer";
import workoutsReducer from "./workouts/workouts_reducer";
import userWorkoutsReducer from "./users/user_workouts_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  routes: routesReducer,
  workouts: workoutsReducer,
  userWorkouts: userWorkoutsReducer
});

export default entitiesReducer;