import ShowRoute from "./show_route";
import { connect } from "react-redux";
import { fetchRoute } from "../../actions/route_actions";

const mSTP = (state, ownProps) => ({
  route: state.entities.routes[ownProps.match.params.routeId] || {
    title: "",
    route_type: "",
    distance: 0.0,
    elevation_gain: 0,
    elevation_loss: 0,
    max_elevation: 0,
  },
});

const mDTP = (dispatch) => ({
  fetchRoute: (routeId) => dispatch(fetchRoute(routeId)),
});

export default connect(mSTP, mDTP)(ShowRoute);
