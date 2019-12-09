import ShowWorkout from './show_workout';
import { connect } from 'react-redux';
import { fetchRoute } from '../../actions/route_actions'
import { fetchWorkout } from '../../actions/workout_actions'

const mSTP = (state, ownProps) => {
  return {
  routes: Object.values(state.entities.routes)[0] || {
    title: "",
    route_type: "",
    distance: 0.0,
    elevation_gain: 0,
    elevation_loss: 0,
    max_elevation: 0
  },
  workouts: state.entities.workouts[ownProps.match.params.workoutId] || {  
    title: "",
    workout_type: "",
    duration: 0,
    avg_speed: 0,
    avg_hr: "",
    resting_hr: "",
    fatigue: 0,
    mood: 0,
    motivation: 0,
    quality: 0,
    comment: ""  
  }
}}

const mDTP = dispatch => ({
  fetchRoute: routeId => dispatch(fetchRoute(routeId)),
  fetchWorkout: workoutId => dispatch(fetchWorkout(workoutId))
})


export default connect(mSTP, mDTP)(ShowWorkout);