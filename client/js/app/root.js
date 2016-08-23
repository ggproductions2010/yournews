// Needed for certain babel polyfills
require('babel-polyfill');

var React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    { Router, useRouterHistory } = require( 'react-router' ),
    { Provider } = require( 'react-redux' ),
    actions = require( './actions' ),
    createHashHistory = require( 'history/lib/createHashHistory' ),
    createLogger = require( 'redux-logger' ),
    routes = require( './routes' ),
    { syncHistory } = require( 'react-router-redux' ),
    { createStore, compose, applyMiddleware, combineReducers } = require( 'redux' ),
    thunk = require( 'redux-thunk' ),
    rootReducer = require( './reducers' ),

    config = require('../config/js-config')
;

// Sets up the main css file via webpack
require('../../css/root.css');

// Sets up tooltip
// var EventEmitter = require( 'events' );
// window.dispatch = new EventEmitter();  
// require( '../helpers/tooltip' );

// Sets up placeholders for IE 9 support
require('../lib/placeholders');

// Sets up so console.log exists on initial run of IE 9
// IE 9 console object doesn't exist until the debugger is open
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
if (!window.console.error) window.console.error = function () { };
if (!window.console.dir) window.console.dir = function () { };


// Sets up the redux router middleware
var history = useRouterHistory( createHashHistory )({
  queryKey: false
});

var reduxRouterMiddleware = syncHistory( history );

var middlewares = [
  thunk,
  reduxRouterMiddleware 
];

if ( config.debug ) {
  window.Perf = require('react-addons-perf');
}

var logger = createLogger({
  predicate: function() {
    if (config.logging) {
      return true;
    }
    return false;
  }
});

middlewares.push(logger);

var createStoreWithMiddleware = compose(
  applyMiddleware(
    ...middlewares
  ), window.devToolsExtension ? window.devToolsExtension() : f => f
)( createStore );

// Creates and sets up the store
var store = createStoreWithMiddleware( rootReducer );
reduxRouterMiddleware.listenForReplays( store );
// store.dispatch(actions.requestInitialData());

var APP_SELECTOR = '#app';


/*
  land on page
  look into cookies to see what their choices for news sites are
  if choices in cookies, store in news-store and make requests for those sites
  if not set defaults as in news-store, and then make an api call for that source
*/

ReactDOM.render(
  (
    <Provider store={ store }>
      <Router history={ history }>
        { routes }
      </Router>
    </Provider>
  ),
  document.querySelector( APP_SELECTOR )
);
