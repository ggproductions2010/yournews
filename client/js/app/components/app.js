var RouteHandler  = require( 'react-router' ).RouteHandler,
    Header        = require( './header/header' ),
    Modal         = require( './modal' ),
    downloadActions = require( '../actions/download' ),
    classNames = require('classnames'),
    { connect } = require('react-redux'),
    { routeActions } = require('react-router-redux'),
    { compose } = require( 'redux' ),
    HTML5Backend = require('react-dnd-html5-backend'),
    DragDropContext = require('react-dnd').DragDropContext
;
import React, { Component, PropTypes } from 'react';

// depends Header, Nav
class App extends Component {

  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    if ( this.props.routing.location.pathname === "/" ) {
      dispatch(routeActions.push('/home'));            
    }
  },

  render() {
    var pathname = this.props.routing.location.pathname;
    var appContentClasses = classNames({
      'app-wide-view': true,
      'home-page-view': pathname  === '/home'
    });
    return(
      <div className="view">
        <Header />
        <div id="content">
          <div className={appContentClasses}>
            {this.props.children}
          </div>
        </div>
        <Modal />
      </div>
    );
   }
};

function selectState(newState) {
  return {
    routing: newState.routing
  };
}

export default connect(selectState)(App);
