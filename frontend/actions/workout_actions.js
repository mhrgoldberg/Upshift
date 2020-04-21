import {
  getAllWorkouts,
  getWorkout,
  postWorkout,
  destroyWorkout,
  patchWorkout
} from "../util/workouts_api_util";

export const RECEIVE_ALL_WORKOUTS = "RECEIVE_ALL_WORKOUTS";
export const RECEIVE_WORKOUT = "RECEIVE_WORKOUT";
export const REMOVE_WORKOUT = "REMOVE_WORKOUT";
export const RECEIVE_WORKOUT_ERRORS = "RECEIVE_WORKOUT_ERRORS";
export const CLEAR_WORKOUT_ERRORS = "CLEAR_WORKOUT_ERRORS";

const receiveAllWorkouts = payload => ({
  type: RECEIVE_ALL_WORKOUTS,
  workouts: payload.workouts
});

const receiveWorkout = workout => ({
  type: RECEIVE_WORKOUT,
  workout
});

const receiveWorkoutErrors = errors => ({
  type: RECEIVE_WORKOUT_ERRORS,
  errors
});

const removeWorkout = workoutId => ({
  type: REMOVE_WORKOUT,
  workoutId
});

export const clearWorkoutErrors = () => ({
  type: CLEAR_WORKOUT_ERRORS
});

export const fetchAllWorkouts = () => dispatch => {
  return getAllWorkouts().then(workouts =>
    dispatch(receiveAllWorkouts(workouts))
  );
};

export const fetchWorkout = workoutId => dispatch => {
  return getWorkout(workoutId).then(workout =>
    dispatch(receiveWorkout(workout))
  );
};

export const createWorkout = workout => dispatch => {
  return postWorkout(workout).then(
    workout => dispatch(receiveWorkout(workout)),
    error => dispatch(receiveWorkoutErrors(error.responseJSON))
  );
};

export const deleteWorkout = workoutId => dispatch => {
  return destroyWorkout(workoutId).then(() =>
    dispatch(removeWorkout(workoutId))
  );
};

export const updateWorkout = workout => dispatch => {
  return patchWorkout(workout).then(workout =>
    dispatch(receiveWorkout(workout))
  );
};