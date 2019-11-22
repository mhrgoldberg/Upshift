import { RECEIVE_ALL_WORKOUTS, RECEIVE_WORKOUT, REMOVE_WORKOUT } from "../../actions/workout_actions";
import { RECEIVE_USER_FEED } from "../../actions/user_actions";

const workoutsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_WORKOUTS:
      return action.workouts;
    case RECEIVE_WORKOUT:
      return Object.assign({}, state, { [action.workout.id]: action.workout });
    case RECEIVE_USER_FEED:
      return action.workouts;
    case REMOVE_WORKOUT:
      let newState = Object.assign({}, state);
      delete newState[action.workoutId];
      return newState;
    default:
      return state;   
  }
}

export default workoutsReducer;