import { connect } from 'react-redux';
import { fetchAllWorkouts, deleteWorkout } from '../../actions/workout_actions';
import WorkoutIndex from './workout_index'

const mSTP = state => ({
  workouts: Object.values(state.entities.workouts),
});

const mDTP = dispatch => ({
  fetchAllWorkouts: () => dispatch(fetchAllWorkouts()),
  deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId))
});

export default connect(mSTP, mDTP)(WorkoutIndex);