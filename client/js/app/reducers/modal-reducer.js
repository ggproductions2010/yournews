var modalActions = require( '../actions/modal-actions' )
;

function initialModalState() {
  return {
    isModalOpen: false,
    modalType: '',
    title: ''
  };
}

function modalReducer(state, action) {
  if (state === undefined) {
    state = initialModalState();
  }

  switch (action.type) {
    case modalActions.OPEN_MODAL:
      return Object.assign({}, state, {
        isModalOpen: true,
        modalType: action.modalType
      });
    case modalActions.CLOSE_MODAL:
      return Object.assign({}, state, {
        isModalOpen: false,
        modalType: ''
      });
    default:
      return state;
  }
}

module.exports = modalReducer;