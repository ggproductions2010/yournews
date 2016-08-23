import newsActions from '../actions/news-actions';

function initialNewsState() {
  return {
  };
}

function newsReducer(state, action) {
  if (state === undefined) {
    state = initialNewsState();
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

export default newsReducer;