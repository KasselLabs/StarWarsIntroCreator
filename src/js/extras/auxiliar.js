import swal from 'sweetalert2';
import * as Sentry from '@sentry/browser';

import ApplicationState, { CREATING } from '../ApplicationState';

export const checkSWFontCompatibility = (title) => {
  const supportedChars = ' qwertyuiopasdfghjklzxcvbnm0123456789!$'.split(''); // all supported supported chars
  const chars = title.toLowerCase().split('');
  return chars.every((char) => supportedChars.indexOf(char) !== -1);
};

export const apiError = (message, reloadPage = false, keepPage = false) => {
  const bodyMessage = encodeURI(`Hi, the SWIC website didn't work as expected.
The following error message is showed:

${message}

I want to provide the following details:

  `);

  const cancelButtonText = reloadPage ? 'RELOAD PAGE' : 'CLOSE';

  return swal({
    title: 'an unexpected error occured',
    html: `${message}.<br/>
    <b style="font-weight: bold">There was an error on your connection.</b> Check if you are using a VPN, or a company network, or an ad block that may block the connection with our website.<br/><br/>
    Please try to use the website again on a different browser or device. If the problem persists, contact us to give more details by clicking on the button below.`,
    type: 'error',
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText,
    confirmButtonText: 'CONTACT SUPPORT',
  }).then((result) => {
    if (result.value) {
      if (Sentry.lastEventId()) {
        Sentry.showReportDialog({ eventId: Sentry.lastEventId() });
      } else { // send email as fallback when no error reported on sentry.
        window.open(`mailto:StarWars@kassellabs.io?Subject=SWIC%20Error&Body=${bodyMessage}`);
      }
    }
    if (result.dismiss === swal.DismissReason.cancel && reloadPage) {
      window.location.reload();
    }

    if (!keepPage) {
      ApplicationState.setState(CREATING);
    }
    return result;
  });
};

export const calculateTimeToRender = (queuePosition) => {
  const workers = 4; // We should never have less than 3 workers at the same time
  const totalMinutes = (queuePosition * 30) / workers;
  const totalHours = Math.floor(totalMinutes / 60);
  const partialDays = Math.floor(totalHours / 24);
  const totalDays = Math.ceil(totalHours / 24);
  let time = '';

  if (queuePosition < 3) {
    return ' 1 hour';
  }
  if (partialDays >= 3) {
    return ` ${totalDays} days`;
  }
  if (partialDays > 0) {
    time += ` ${partialDays} day${partialDays !== 1 ? 's' : ''}`;
  }

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    time += `${partialDays ? ',' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    time += ` and ${minutes} minutes`;
  }
  return time;
};
