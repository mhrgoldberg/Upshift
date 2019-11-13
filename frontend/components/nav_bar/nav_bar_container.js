import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/session_actions'
import { withRouter } from 'react-router-dom';

const mSTP = (state) => ({
  currentUser: state.entities.users[state.session.id]
  
});

const mDTP = (dispatch) => ({
  logout: () => dispatch(logout())
});


export default withRouter(connect(mSTP, mDTP)(NavBar))