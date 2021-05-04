import React from 'react';
import PropTypes from 'prop-types';
import DonateOrNotDonate from './DonateOrNotDonateNew';
import TermsOfServiceAcceptance from '../TermsOfServiceAcceptance';
import ContactButton from '../ContactButton';
import EmailRequestField from '../EmailRequestField';
import { calculateTimeToRender } from '../../extras/auxiliar';
import { QUEUED } from '../constants';
import Atat from '../Atat';

const RequestDownloadPage = ({
  donate,
  status,
  openingKey,
  finishRequestHandle,
  ...props
}) => {
  const { queueSize, queuePosition } = status;
  const isQueued = status.status === QUEUED;

  const position = 1 + isQueued ? queuePosition : queueSize;

  const timeToRender = calculateTimeToRender(position);

  const notQueuedText = 'will be';
  const qeuedText = 'is';

  return (
    <div>
      <Atat />
      <p>
        Your video request
        {' '}
        {isQueued ? qeuedText : notQueuedText}
        {' '}
        queued at position
        {' '}
        <b>{position}</b>
        .
        It may take up to
        {' '}
        <b>{timeToRender}</b>
        {' '}
        to have your video rendered.
        Free videos will be rendered in the HD quality (1280x720).
        <p>
          <DonateOrNotDonate question="You can still donate to get it earlier if you want." yesText="Go back to donate" {...props} hideNoDonateOption />
        </p>
      </p>
      <p>
        Fill your email below and when your video is ready
        you will receive a message with the link to download it.
        We promise not to send spam!
      </p>

      <TermsOfServiceAcceptance />
      <ContactButton />
      <EmailRequestField
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
      />
    </div>
  );
};

RequestDownloadPage.propTypes = {
  donate: PropTypes.bool,
  status: PropTypes.object,
  openingKey: PropTypes.string,
  finishRequestHandle: PropTypes.func,
};

export default RequestDownloadPage;
