import { h } from 'preact';
import DonateOrNotDonate from './DonateOrNotDonate';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';
import EmailRequestField from './EmailRequestField';
import { calculateTimeToRender } from '../extras/auxiliar';
import { QUEUED } from './constants';

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

  const iframe = document.querySelector('#paypalDonateIframe');

  const donateScreen = (
    <div>
      <p>
        Great choice! You can donate how much you want but there is a minimum to receive the video.
        <ul>
          <li>At least <b>7 US Dollars</b> for HD video (1280x720).</li>
          <li>At least <b>10 US Dollars</b> for Full HD video (1920x1080)</li>
          <li>At least <b>30 US Dollars</b> for more customizable video with
          the Death Star image replacement (Contact us via email to submit your image).
          </li>
        </ul>
        <b>Click</b> on the following PayPal button to donate:
      </p>
      <iframe
        title="PayPal Donation Buttons"
        src={`${iframe.src}#!/${openingKey}`}
        className={iframe.classList.toString()}
        height="33px"
      />
      <p>
        <b>Make sure to check on your PayPal account if the donation went successfully.</b>
      </p>
    </div>
  );

  const paypalEmail = donate
    ? (<p>Please, use the same email from your PayPal account and if you don't receive our confirmation mail, please contact us.</p>)
    : '';

  const notQueuedText = 'will be';
  const qeuedText = 'is';

  const youCanStillDonate = (
    <p>
      Your video request {isQueued ? qeuedText : notQueuedText} queued at position <b>{position}</b>.
      It may take up to <b>{timeToRender}</b> to have your video rendered.
      You can still donate to get it earlier if you want.
      <p>
        <DonateOrNotDonate {...props} hideNoDonateOption />
      </p>
    </p>
  );

  return (
    <div className="requestDownloadPage">
      {donate && donateScreen}
      {!donate && youCanStillDonate}
      <p>
        Now, fill your email below and when your video is ready
        you will receive a message with the link to download it.
        We promise not to send spam!&nbsp;
      </p>
      {paypalEmail}
      <TermsOfServiceAcceptance />
      <ContactButton />
      <EmailRequestField
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
      />
    </div>
  );
};

export default RequestDownloadPage;
