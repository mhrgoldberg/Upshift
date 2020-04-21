import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { createRoute } from "../../actions/route_actions";
import SaveRouteForm from "./save_route_form";

const mapStatetoProps = (state, ownProps) => {
  return {
    currentUserId: state.session.id,
    errors: state.errors.route,
    routeInfo: ownProps.routeInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  createRoute: (route) => dispatch(createRoute(route)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(SaveRouteForm);
