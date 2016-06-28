var routeReducer = require('react-router-redux').routeReducer,
    combineReducers = require('redux').combineReducers,

    modalReducer = require('./modal-reducer')
;


module.exports = combineReducers({
  routing: routeReducer,
  modal: modalReducer
});
