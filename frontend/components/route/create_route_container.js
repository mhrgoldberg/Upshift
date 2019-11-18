import { connect } from 'react-redux';
import CreateRoute from './create_route'
import { openModal } from '../../actions/modal_actions'

const mDTP = dispatch => ({
  submitRoute: route => disatch(submitRoute(route)),
  openModal: modal => dispatch(openModal(modal))
})

export default connect(null, mDTP)(CreateRoute);