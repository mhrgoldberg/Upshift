import { connect } from 'react-redux';
import SignupForm from '../user/sign_up_form.jsx';
import { signUp } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (formUser) => (dispatch(signUp(formUser)))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
