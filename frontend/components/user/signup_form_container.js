import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signUp } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: "signup"
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => (dispatch(signUp(formUser)))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
