import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER_FEED } from '../../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser});
    case RECEIVE_USER_FEED:
      return action.users || {};
    default:
      return state;   
  }
}

export default usersReducer;