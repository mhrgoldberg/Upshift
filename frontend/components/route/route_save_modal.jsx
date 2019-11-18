import React from 'react';
import { closeModal } from '../../actions/modal_actions'
import { connect } from 'react-redux';
import  SaveRouteContainer  from './save_route_container'

function routeSaveModal({routeInfo, modal, closeModal}) {
  if (!modal) {
    return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        <SaveRouteContainer routeInfo={routeInfo}/>
      </div>
    </div>
  );
}

const mSTP = state => {
  return {
    modal: state.ui.modal
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(routeSaveModal);