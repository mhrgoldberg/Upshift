import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout, clearSessionErrors } from '../../actions/session_actions'
import { withRouter } from 'react-router-dom';

const mSTP = (state) => ({
  currentUser: state.entities.users[state.session.id]
  
});

const mDTP = (dispatch) => ({
  logout: () => dispatch(logout()),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});


export default withRouter(connect(mSTP, mDTP)(NavBar))