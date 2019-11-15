import { combineReducers } from "redux";
import usersReducer from "./users/users_reducer";
import routesReducer from "./routes/routes_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  routes: routesReducer
});

export default entitiesReducer;