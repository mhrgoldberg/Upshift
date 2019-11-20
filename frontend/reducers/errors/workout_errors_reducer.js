import {RECEIVE_WORKOUT_ERRORS, RECEIVE_WORKOUT, CLEAR_WORKOUT_ERRORS} from '../../actions/workout_actions'

const workoutErrorsReducer = (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WORKOUT_ERRORS:
      return action.errors;
    case RECEIVE_WORKOUT:
      return [];
    case CLEAR_WORKOUT_ERRORS:
      return [];
    default:
      return state;
  }
}

export default workoutErrorsReducer;