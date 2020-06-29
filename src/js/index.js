import swal from 'sweetalert2';
import 'babel-polyfill';
import 'sweetalert2/dist/sweetalert2.min.css';

import '../styles/main.styl';

import './extras/facebooksdk';
import './extras/googleanalytics';

import startApplication from './App';

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});


(function _() {
  if ('development' === process.env.NODE_ENV) {
    startApplication();
    return;
  }

  Raven.config(process.env.RAVEN, {
    ignoreErrors: [
      'AutoPlayError',
      'null is not an object (evaluating \'elt.parentNode\')',
      'SetEvent is not defined',
      'OnSceneLoad is not defined',
      'undefined',
      'from accessing a frame with origin',
      'Minified exception occurred; use the non-minified dev environment for the full error',
      'document.getElementsByTagName(\'embed\')[0].src',
      '$ is not defined',
      'Cannot redefine property: googletag',
      'No logins found',
      'Can\'t find variable: pktAnnotationHighlighter',
      'window.onorientationchange is not a function. (In \'window.onorientationchange()\', \'window.onorientationchange\' is null)',
      'script_serverip is not defined',
      'ResizeObserver loop limit exceeded',
    ],
    ignoreUrls: [
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
    ],
    shouldSendCallback: (data) => {
      // if ('https://connect.facebook.net/en_US/sdk.js' === data.culprit) {
      //   return false;
      // }
      Raven.captureBreadcrumb({
        message: 'Raven shouldSendCallback error data',
        category: 'info',
        data,
      });
      return true;
    },
    release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572',
  }).install();
  Raven.context(() => {
    startApplication();
  });
}());
