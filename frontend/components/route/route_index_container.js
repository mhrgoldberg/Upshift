import { connect } from 'react-redux';
import RouteIndex from './route_index';
import { fetchAllRoutes } from '../../actions/route_actions'

const mSTP = state => {
  return {
  routes: Object.values(state.entities.routes)
}}

const mDTP = dispatch => ({
  fetchAllRoutes: () => dispatch(fetchAllRoutes())
})

export default connect(mSTP, mDTP)(RouteIndex);