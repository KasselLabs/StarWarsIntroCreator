import React, { Component } from 'react';
import DonateOrNotDonate from './DonateOrNotDonate';
import { calculateTimeToRender } from '../extras/auxiliar';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';

const NotQueuedPage = ({ status, openingKey, ...props }) => {
  const { queueSize } = status;
  const timeToRender = calculateTimeToRender(queueSize + 1);
  const urlToEdit = `#!/${openingKey}/edit`;

  return (
    <div>
      <p>
        You can now request a download of your creation as a video,
        which you can play anywhere, put it in a slideshow or
        edit it in a movie editor, for instance.
        The video will be rendered on our servers and when it&apos;s ready,
        it will be sent to your email.
        We want to provide the video for free, but we have costs with the servers.
      </p>
      <p>
        There are <b>{queueSize} videos</b> in front of you to be rendered and
        may take up to<b>{timeToRender}</b> to send your video.
      </p>
      <p>
        Can&apos;t wait for it? Donate to support our service and your video will
        be ready in a few hours (2 hours usually).<br />
        <ul>
          <li>Donate at least <b>7 US Dollars</b> for the video in standard HD quality.</li>
          <li>Donate at least <b>10 US Dollars</b> for the <b>Full HD Quality</b>.</li>
          <li>Donate at least <b>30 US Dollars</b> for more customizable video with
          the Death Star image replacement (Contact us via email to submit your image).
          </li>
        </ul>


      </p>
      <p>
        You can donate via Credit Card or PayPal.
        If you don&apos;t receive the video please contact us via email so we can check it out.
      </p>
      <p>
        Your video will be rendered to a MP4 file.&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=lYnLLF2QyM4">
          Check a sample video how your video will look like here.
        </a>
      </p>

      <ContactButton />
      <TermsOfServiceAcceptance />
      <DonateOrNotDonate {...props} />
    </div>
  );
};

export default NotQueuedPage;
