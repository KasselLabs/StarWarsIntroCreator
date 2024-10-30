import 'babel-polyfill';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import * as Sentry from '@sentry/browser';

import '../styles/normalize.css';
import '../styles/main.styl';

import './extras/facebookpixel';
import './extras/googleanalytics';
import './extras/donateFlowTest';
import './extras/tawkToChat';

import startApplication from './App';

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});

(function _() {
  if (process.env.NODE_ENV === 'development') {
    startApplication();
    return;
  }

  Sentry.init({
    dsn: 'https://1613dee0f015471fafcf9bf88ceaf748@o152641.ingest.sentry.io/1204808',
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
      /googletagmanager.com/i,
    ],
    shouldSendCallback: (data) => {
      // if ('https://connect.facebook.net/en_US/sdk.js' === data.culprit) {
      //   return false;
      // }
      Sentry.addBreadcrumb({
        message: 'Sentry shouldSendCallback error data',
        category: 'info',
        data,
      });
      return true;
    },
    release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572',
  });

  startApplication();
}());
