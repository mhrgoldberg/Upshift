import { RECEIVE_ALL_ROUTES, RECEIVE_ROUTE } from "../../actions/route_actions";


const routesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_ROUTES:
      return action.routes
    case RECEIVE_ROUTE:
      return Object.assign({}, state, { [action.route.id]: action.route })
    default:
      return state;   
  }
}

export default routesReducer;