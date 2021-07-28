import React from 'react';
import DonateOrNotDonate from './DonateOrNotDonateNew';
import { calculateTimeToRender } from '../../extras/auxiliar';
import TermsOfServiceAcceptance from '../TermsOfServiceAcceptance';
import ContactButton from '../ContactButton';
import PaymentModule from '../PaymentModule';

const VideoQueuedPage = ({ status, openingKey, ...props }) => {
  const { queuePosition } = status;
  const timeToRender = calculateTimeToRender(queuePosition);

  return (
    <div>
      <p>
        This video is already in the queue to be rendered.
        You can add more emails to receive the video,
        just click on the link at the end of the page.
      </p>
      <p>
        There are <b>{queuePosition} videos</b> in front of this request to be rendered and
        may take up to<b>{timeToRender}</b> to send the video.
      </p>
      <p>
        Can&apos;t wait for it? Donate to support our service and your video will
        be ready in a few hours (2 hours usually).<br />
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
      <TermsOfServiceAcceptance />
      <DonateOrNotDonate noText="No, I just want to add a new email" {...props} />
    </div>
  );
};

export default VideoQueuedPage;
