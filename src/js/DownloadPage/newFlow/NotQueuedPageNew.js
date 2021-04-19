import React from 'react';
import DonateOrNotDonateNew from './DonateOrNotDonateNew';
import { calculateTimeToRender } from '../../extras/auxiliar';
import TermsOfServiceAcceptance from '../TermsOfServiceAcceptance';
import ContactButton from '../ContactButton';
import PaymentModule from '../PaymentModule';

const NotQueuedPage = ({ status, openingKey, ...props }) => {
  const { queueSize } = status;
  const timeToRender = calculateTimeToRender(queueSize + 1);

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
        Do you want to see a sample video?{` `}
        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=lYnLLF2QyM4">
          Take a look at this one on YouTube.
        </a>
      </p>

      <ContactButton
        customText="Need any help? Please check our"
        endText="page"
      />
      Before sending the download request make sure there are no typos in your text
      to grant that your video will be with the correct text.
      <TermsOfServiceAcceptance />
      <DonateOrNotDonateNew {...props} />
    </div>
  );
};

export default NotQueuedPage;
