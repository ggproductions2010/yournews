var React         = require( 'react' ),
    Router        = require( 'react-router' ),
    { Route, IndexRoute } = require('react-router')
;

import App from './components/app';
import Home from './components/home';
import NotFound from './components/not-found';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
);
