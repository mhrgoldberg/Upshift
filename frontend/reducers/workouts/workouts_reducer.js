import { RECEIVE_ALL_WORKOUTS, RECEIVE_WORKOUT, REMOVE_WORKOUT } from "../../actions/workout_actions";

const workoutsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_WORKOUTS:
      return action.workouts
    case RECEIVE_WORKOUT:
      return Object.assign({}, state, { [action.workout.id]: action.workout })
    case REMOVE_WORKOUT:
      let newState = Object.assign({}, state);
      delete newState[action.workoutId];
      return newState;
    default:
      return state;   
  }
}

export default workoutsReducer;