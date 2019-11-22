import { RECEIVE_ALL_ROUTES, RECEIVE_ROUTE } from "../../actions/route_actions";
import { RECEIVE_USER_FEED } from "../../actions/user_actions";


const routesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_ROUTES:
      return action.routes;
    case RECEIVE_ROUTE:
      return Object.assign({}, state, { [action.route.id]: action.route });
    case RECEIVE_USER_FEED:
      return action.routes;
    default:
      return state;   
  }
}

export default routesReducer;