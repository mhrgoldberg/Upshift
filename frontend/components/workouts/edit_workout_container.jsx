import React from 'react';
import { connect } from 'react-redux';
import { fetchWorkout, updateWorkout } from '../../actions/workout_actions';
import { fetchAllRoutes } from '../../actions/route_actions';
import WorkoutForm from './workout_form';


class EditWorkoutForm extends React.Component {


  componentDidMount(){
    this.props.fetchAllRoutes()
    .then( () => this.props.fetchWorkout(this.props.match.params.workoutId)) 
  }


  render () {
    const { workout, formType, submitWorkout, errors, fetchAllRoutes, routes } = this.props;


    if (!workout) {
      return (
        <div class="loader loader-double is-active"></div>
      )
    } 
    return (
      <WorkoutForm
        workout={workout}
        formType={formType}
        submitWorkout={submitWorkout}
        errors={errors}
        fetchAllRoutes={fetchAllRoutes}
        routes={routes} />
    );
  }
}


const mSTP = (state, ownProps) => {

  return{
  workout: state.entities.workouts[ownProps.match.params.workoutId],
  // workout: state.entities.workouts.undefined.workout,
  formType: "Update Workout",
  errors: state.errors.workout,
  routes: Object.values(state.entities.routes),
}}

const mDTP = dispatch => ({
  submitWorkout: workout => dispatch(updateWorkout(workout)),
  fetchWorkout: workoutId => dispatch(fetchWorkout(workoutId)),
  fetchAllRoutes: () => dispatch(fetchAllRoutes())
})

export default connect(mSTP, mDTP)(EditWorkoutForm); 