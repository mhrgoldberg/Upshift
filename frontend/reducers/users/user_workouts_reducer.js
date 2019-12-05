
import { RECEIVE_USER_FEED } from '../../actions/user_actions';

const userWorkoutsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER_FEED:
      return action.userWorkouts
    default:
      return state;   
  }
}

export default userWorkoutsReducer;