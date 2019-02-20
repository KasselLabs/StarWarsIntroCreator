import { h } from 'preact';
import DonateOrNotDonate from './DonateOrNotDonate';
import { calculateTimeToRender } from '../extras/auxiliar';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';

const VideoQueuedPage = ({ status, openingKey, ...props }) => {
  const { queuePosition } = status;
  const timeToRender = calculateTimeToRender(queuePosition);

  return (
    <div>
      <p>
        This video is already in the queue to be rendered.
        This page will be updated when the video is ready.
        You can add more emails to receive the video,
        just follow the next page and add submit the request again with the new email.
      </p>
      <p>
        There are <b>{queuePosition} videos</b> in front of this request to be rendered and
        may take up to<b>{timeToRender}</b> to send the video.
      </p>
      <p>
        Can&apos;t wait for it? Donate to support our service and your video will
        be ready in few hours (2 hours usually).<br />
        <ul>
          <li>Donate at least <b>7 US Dollars</b> for the video in standard HD quality.</li>
          <li>Donate at least <b>10 US Dollars</b> for the <b>Full HD Quality</b>.</li>
          <li>Donate at least <b>30 US Dollars</b> for more customizable video with
          the Death Star image replacement (Contact us via email to submit your image).
          </li>
        </ul>

        Your video will be rendered to a MP4 file.&nbsp;
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/iYKU4pNy034">
          Check a sample video how your video will look like here.
        </a>

      </p>
      <p>
        The donation is made via PayPal and it&apos;s safe.
        If you don&apos;t receive the video please contact us via email so we can check it out.
      </p>

      <TermsOfServiceAcceptance />
      <ContactButton />
      <p><b>You want to receive your video faster by donating or wait in the queue?</b></p>
      <DonateOrNotDonate {...props} />
    </div>
  );
};

export default VideoQueuedPage;
