var connect = require('react-redux').connect,
    classNames = require('classnames')
;

import React, { Component, PropTypes } from 'react';

class Header extends Component {

  render: function () {

    return (
      <div className="header">
      </div>
    );
  }
};

function select(newState) {
  return {
  };
}

export default connect(select)(Header);