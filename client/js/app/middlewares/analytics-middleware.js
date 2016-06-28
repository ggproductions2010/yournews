// import { UPDATE_LOCATION } from 'react-router-redux';
// import mixpanel from 'mixpanel-browser';
// import config from '../../config/js-config';

// import * as userActions from '../actions/user';
// import * as chartActions from '../actions/chart';
// import * as middlewareActions from '../actions/middleware';

// const mixpanelDevToken = '8c9ac8aa78873aa69630ac9f5cb3ded6';
// const mixpanelProdToken = 'd48b7161befbd2411f27b9d45d1d19bd';

// if (!config.analytics) {
//   mixpanel.init(mixpanelDevToken);
// } else {
//   mixpanel.init(mixpanelProdToken);
// }

// module.exports = function analyticsMiddleware(store) {
//   return next => action => {
//     const result = next(action);

//     if (action) {

//       // Tracking only works after userId is set
//       // This applies only to userId views
//       if (action.type === userActions.RECEIVE_USER) {
//         ga('set', 'userId', action.data[0].id);
//         ga('set', 'customUserId', action.data[0].id);
//         ga('set', 'groupName', action.data[0].company_name);
//         ga('send', 'event', 'Authenification', 'Logged in');

//         mixpanel.people.set({ 
//           'Id': action.data[0].id,
//           '$username': action.data[0].username,
//           '$first_name': action.data[0].first_name,
//           '$last_name': action.data[0].last_name,
//           'Company': action.data[0].company_name,
//           '$email': action.data[0].email 
//         });

//         mixpanel.identify(action.data[0].id);
//         mixpanel.track("Logged In");
//       }

//       if (action.type === UPDATE_LOCATION) {
//         // For some reason, can't set a custom path. Needs to have the format:
//         // e.g. '/ctlctr/#/overview'. Maybe look into refining this in the future
//         ga('set', 'page', document.location.pathname + document.location.hash);
//         ga('send', 'pageview');

//         var path = action.payload.pathname.replace('/', '');
//         var formattedPath = path.charAt(0).toUpperCase() + path.slice(1);
//         mixpanel.track('Page Viewed', {
//           'Path': formattedPath
//         });
//       }

//       if (action.type === chartActions.CREATED_CHART) {
//         ga('send', 'event', 'Charts', 'Created chart');

//         mixpanel.track("Created Chart");
//       }

//       if (action.type === middlewareActions.EXPORTED_ALL_DATA) {
//         ga('send', 'event', 'List', 'Exported all data');

//         mixpanel.track("Exported All Data");
//       }

//       if (action.type === middlewareActions.LOGGED_OUT) {
//         ga('send', 'event', 'Authenification', 'Logged Out');

//         mixpanel.track("Logged Out");
//         mixpanel.persistence.clear();
//       }

//     }
    
//     return result;
//   };
// }
