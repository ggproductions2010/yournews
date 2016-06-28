var classNames = require('classnames'),
    arcSvg = require( '../../helpers/svg-arc' )
;

import React, { Component, PropTypes } from 'react';

// For IE 9, since it doesn't support requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
}());

class Loading extends Component {

  componentDidMount() {
    var svg,
        svgWrap = document.createElement( 'div' )
    ;

    svgWrap.setAttribute( 'class', 'svg-wrap' );

    var start = (+ new Date());
    var min = 0.2;
    var maxDelta = 0.3;
    var stop = false;
    
    // Kick off animation of svg arc
    requestAnimationFrame( function animateSvg() {
      // continously increasing number for animation
      var dt = ( (+ new Date()) - start ) / 600;
      
      // If there is an svg arc remove it
      if ( svg ) {
        try {
          svgWrap.removeChild( svg );
        } catch(e) { /* fail silently */ }
      }

      // Create an svg arc with an svg size of 100, a radius of 40, a mathmatically computed number between 0 - 1 for the easing that is on a cosine curve , a background class, and a foreground class
      svg = arcSvg( 100, 40, min + maxDelta / 2 + ( maxDelta / 2 * Math.cos( dt ) ), 'loading-bg', 'loading-fg' );
      svg.setAttribute( 'fill', 'none' );
      // Append svg arc to a div container
      svgWrap.appendChild( svg );
      
      // loop svg arc animation until loading directive is taken out of view
      if ( !stop ) {
        requestAnimationFrame( animateSvg );
      }
    });

    var loadingIcon = this.refs.loadingIcon;
    loadingIcon.appendChild( svgWrap );
  }

  render() {

    const {
      fullscreen,
    } = this.props;

    let loadingIconClasses = classNames({
      'loading-icon': true,
      'fullscreen': fullscreen,
    });

    return (
      <div className={ loadingIconClasses } ref="loadingIcon">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA2CAYAAAAxpDyoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNJREFUeNrsnDtu20AQhleBDsAUrsPcgDcIdQOncZPCUhHAneETWDqBk86AC9NFGjemTyDmBGFOEKVOw9wgM9QwEAhJ+yBtDah/gMVKIFfanU/z2OWujIGokpHmzp2dfYqoOqUSU6moZI+P3yqXtid3F9w2OWD3qz+fb8sgIDTwmx2dL0kBVweCwf15Ehj/B0llQn0qLTBSaRsd+DeVU5kRmMq1wVhqHnyqzEDuWzCMKHhJ5a3FMjTAMGLdP6nMXRu8Ueqqkj3uJqLrqUUJkaLhnPvcrBJIR4XGysYSDwGILRiuhpplqQQimdSXHZc50xoskLHWjnF2R7HiL728FBfWpL1dsr7JC8eKqUN85HtuxAt8p/KOylcqP2hso7HmXwt1cO6TodiE0s/ipfoqqbbLmDKCck71hOr5RhJSaY4hxyS5BP5StcsauDRuN2tnlkFAZB6Qiv+LW9kR+/2CTLKA3ne6rVLqVXBQJwis+GvLxKvxo9d0fyXm+BACR+NyjposS4LPpeeELZKsY0rt6zUd14VBEY3LOYefh5Ay78Uyusye2ap+yZIIpAOQ1CW39rCYJaDomqnXK7HynAPSE5BmWYOfS4yaQu/fc5ww9nWmJjmA9LB0wnnz1bbgLCkcX88k7uxzdRzoF55BHhbSEs6SnDIlvk9S3n2u6xTqDweS8xqM52fPxL3tkg9QfxiQSpTrOxutWksD22IJJABI3sHXPwBI/0CeQz/csjsEQAKBFB2/o4CaewSC1FQXkBIq0gUE1qF4YggBEACBAAgEQAAEAiAAMjw5ubtI5ADQqwl2Lm4HwQ/P+KlnJO8Lqj76HE2DhfQHI96EIZJSWb6GtYyPTNlLh9sis30PWiJQJo2l0OvNs4wxgPhL2rF9G8rCrA+h9mY5cFnhUCI5h86HgCoAGSiUIQLJlUHJjxqIKCdTBGVx9EGdlDMjJf02/ez9sv1nymagL7k260OdddD3/b+TkYG4pMu2rbEstYV0nTwiqDtanIMbTMQyENQVQZkCiD4oAKIIygpA9EAJ2pSOLKvf7Cs16/Wx+gg4gVpBKwOTfwIMAGsWH9EZhMciAAAAAElFTkSuQmCC" />
      </div>
    );
  }
};

export default Loading;