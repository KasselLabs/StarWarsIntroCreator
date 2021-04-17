import React from 'react';
import DonateOrNotDonateNew from './DonateOrNotDonateNew';
import { calculateTimeToRender } from '../../extras/auxiliar';
import TermsOfServiceAcceptance from '../TermsOfServiceAcceptance';
import ContactButton from '../ContactButton';
import PaymentModule from '../PaymentModule';

const NotQueuedPage = ({ status, openingKey, ...props }) => {
  const { queueSize } = status;
  const timeToRender = calculateTimeToRender(queueSize + 1);
  // TODO improve check sample text
  return (
    <div>
      <p>
        You can now request a download a video of your creation.
        We want to provide the video for free, but we have costs with
        the servers where the video are rendered.
      </p>
      <p>
        There are <b>{queueSize} videos</b> in front of you to be rendered and
        may take up to<b>{timeToRender}</b> to send your video.
      </p>
      <p>
        Can&apos;t wait for it? Donate to support our service and your video will
        be ready in a few hours (2 hours usually).
      </p>
      <PaymentModule openingKey={openingKey} />
      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=lYnLLF2QyM4">
          Check a sample video how your video will look like here.
        </a>
      </p>

      <ContactButton
        customText="Need any help? Please check our"
        endText="page"
      />
      <TermsOfServiceAcceptance />
      <DonateOrNotDonateNew {...props} />
    </div>
  );
};

export default NotQueuedPage;
