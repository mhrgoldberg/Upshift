import ShowWorkout from './show_workout';
import { connect } from 'react-redux';
import { fetchRoute } from '../../actions/route_actions'
import { fetchWorkout } from '../../actions/workout_actions'

const mSTP = (state, ownProps) => ({
  route: state.entities.routes[ownProps.match.params.routeId] || {
    title: "",
    route_type: "",
    distance: 0.0,
    elevation_gain: 0,
    elevation_loss: 0,
    max_elevation: 0
  },
  workouts: state.entities.workouts[ownProps.match.params.workoutId] || {   
  }
})

const mDTP = dispatch => ({
  fetchRoute: routeId => dispatch(fetchRoute(routeId)),
  fetchWorkout: workoutId => dispatch(fetchWorkout(workoutId))
})


export default connect(mSTP, mDTP)(ShowWorkout);