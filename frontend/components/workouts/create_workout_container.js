import { connect } from "react-redux";
import { createWorkout } from "../../actions/workout_actions";
import WorkoutForm from "./workout_form";
import { fetchAllRoutes } from "../../actions/route_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state) => ({
  workout: {
    title: "",
    workout_type: "",
    hours: "",
    minutes: "",
    seconds: "",
    avg_speed: "",
    avg_hr: "",
    resting_hr: "",
    fatigue: "",
    mood: "",
    motivation: "",
    quality: "",
    comment: "",
    route_id: "",
    distance: 0,
  },
  routes: Object.values(state.entities.routes),
  errors: state.errors.workout,
  formType: "Create Workout",
  currentUserId: state.session.id,
});

const mDTP = (dispatch) => ({
  submitWorkout: (workout) => dispatch(createWorkout(workout)),
  fetchAllRoutes: () => dispatch(fetchAllRoutes()),
});

export default connect(mSTP, mDTP)(WorkoutForm);
