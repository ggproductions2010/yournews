var config = require('../config/js-config');

var BASE_API_PATH = '/api/v1.0.0/'
;


function toApiPathParams( resource, params ) {
  var path = BASE_API_PATH + resource + '/';
  if ( params !== undefined && Object.keys(params).length > 0 ) {
    path += '?';
    path += Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
  }

  return path;
}

function toApiPath( resource, id ) {
  var path = BASE_API_PATH + resource + '/';

  if ( id !== undefined ) {
    path += id + '/';
  }

  return path;
}

function logRequest( xhr ) {
  if (config.logging) {
    console.log( 'HttpRequest', xhr );
  }
}

function logResponse( xhr ) {
  if (config.logging) {
    console.log( 'HttpResponse', xhr );
  }
}

function logResponseError( xhr ) {
  if (config.logging) {
    console.log( 'HttpError', xhr );
  }
}

function cookieGetter() {
  var cookie = document.cookie.match(/\bcsrftoken=(\w+)[\b;]?/);
  return cookie[1] ? cookie[1] : null;
}

module.exports = {
  get: function( resource, params ) {
    return new Promise( function( res, rej ) {
      var path = toApiPathParams( resource, params ),
          xhr = new XMLHttpRequest()
      ;
      
      xhr.open( 'GET', path, true );

      xhr.setRequestHeader(
        'Accept',
        'application/json; charset=UTF-8'
      );

      xhr.send();

      logRequest( xhr );

      xhr.onload = function() {
        var statusPrefix = Math.floor( xhr.status / 100 ); // 200, 404, etc.

        if ( statusPrefix === 2 ) {
          var data = xhr.responseText ? JSON.parse( xhr.responseText ): JSON.parse( xhr.response );
          logResponse( xhr );
          res( data );
        } else {
          logResponseError( xhr );
          rej( xhr );
        }
          
      };
    });
  },

  post: function( resource, data ) {
    return new Promise( function( res, rej ) {
      var path = toApiPath( resource ),
          xhr = new XMLHttpRequest()
      ;

      xhr.open( 'POST', path, true );

      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );

      xhr.setRequestHeader(
        'X-CSRFToken',
        cookieGetter()
      );

      xhr.setRequestHeader(
        'Accept',
        'application/json; charset=UTF-8'
      );

      xhr.send( JSON.stringify( data ) );
      
      logRequest( xhr );

      xhr.onload = function() {
        var statusPrefix = Math.floor( xhr.status / 100 ); // 200, 404, etc.

        if ( statusPrefix === 2 ) {
          var data = xhr.responseText ? JSON.parse( xhr.responseText ): xhr.response ? JSON.parse( xhr.response ) : '';
          logResponse( xhr );
          res( data );
        } else {
          logResponseError( xhr );
          rej( xhr );
        }
      };
    });
  },

  // Post to AWS S3
  postS3: function( url, data, onUploadProgress ) {
    return new Promise( function( res, rej ) {
      var path = url,
          xhr = new XMLHttpRequest(),
          formData = new FormData()
      ;

      for (var i = 0; i < Object.keys(data).length; i++) {
        var key = Object.keys(data)[i];
        formData.append(key, data[key]);
      }

      // Keep track of upload progress so that we can message
      // it to the user.
      xhr.upload.onprogress = onUploadProgress;

      xhr.onreadystatechange = function () {
        if ( xhr.readyState === 4 ) {
          var statusPrefix = Math.floor( xhr.status / 100 );
          
          if (statusPrefix === 2) {
            var data = xhr.responseText;
            logResponse( xhr );
            res( data );
          } else {
            logResponseError( xhr );
            rej( xhr );
          }
        }
      };

      xhr.open( 'POST', path, true );

      xhr.send( formData );
      
      logRequest( xhr );
    });
  },

  patch: function( resource, id, data ) {
    return new Promise( function( res, rej ) {
      var path = toApiPath( resource, id ),
          xhr = new XMLHttpRequest()
      ;

      xhr.open( 'PATCH', path, true );

      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );

      xhr.setRequestHeader(
        'X-CSRFToken',
        cookieGetter()
      );

      xhr.setRequestHeader(
        'Accept',
        'application/json; charset=UTF-8'
      );

      xhr.send( JSON.stringify( data ) );
      
      logRequest( xhr );

      xhr.onload = function() {
        var statusPrefix = Math.floor( xhr.status / 100 ); // 200, 404, etc.

        if ( statusPrefix === 2 ) {
          var data = xhr.responseText ? JSON.parse( xhr.responseText ): JSON.parse( xhr.response );
          logResponse( xhr );
          res( data );
        } else {
          logResponseError( xhr );
          rej( xhr );
        }
      };
    });
  },

  deleteHttp: function( resource, id ) {
    return new Promise( function( res, rej ) {
      var path = toApiPath( resource, id ),
          xhr = new XMLHttpRequest()
      ;

      xhr.open( 'DELETE', path, true );

      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );

      xhr.setRequestHeader(
        'X-CSRFToken',
        cookieGetter()
      );

      xhr.setRequestHeader(
        'Accept',
        'application/json; charset=UTF-8'
      );

      xhr.send();
      
      logRequest( xhr );

      xhr.onload = function() {
        var statusPrefix = Math.floor( xhr.status / 100 ); // 200, 404, etc.

        if ( statusPrefix === 2 ) {
          var data = xhr.responseText ? JSON.parse( xhr.responseText ): xhr.response ? JSON.parse( xhr.response ) : 'no response';
          logResponse( xhr );
          res( data );
        } else {
          logResponseError( xhr );
          rej( xhr );
        }
      };
    });
  }
};