import { h, Component } from 'preact';

import { calculateTimeToRender } from '../extras/auxiliar';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';
import CheckForDonation from './CheckForDonation';
import UrlHandler from '../extras/UrlHandler';

class VideoRequestSent extends Component {
  handleOkButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToEditPage(openingKey);
  }

  handleAddEmailButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToDownloadPage(openingKey, 'add_email');
  }

  renderEmail() {
    const { requestEmail } = this.props;

    if (!requestEmail) {
      return null;
    }

    return (
      <span>The link to download the video will be sent to the email:
        <p className="email">
          {requestEmail}
        </p>
      </span>
    );
  }

  renderDidNotDonate() {
    const { requestStatus } = this.props;
    const { queuePosition } = requestStatus;
    const timeToRender = calculateTimeToRender(queuePosition);

    return (
      <p>
        Your video request has been queued!
        Your current position on the queue is <b>{queuePosition}</b>,
        and may take up to {timeToRender} to send your video.
        {this.renderEmail()}
        The link to download will also be available on this page when it&apos;s ready.
        You can add more emails to receive the video if you want in the button below.
      </p>
    );
  }

  renderDonate() {
    const iframe = document.querySelector('#paypalDonateIframe');
    const { openingKey } = this.props;
    return (
      <div>
        <CheckForDonation openingKey={openingKey} />
        <p>
          Thank you so much for supporting us!
          Your video should be rendered soon when your donation is confirmed!
        </p>
        <p>
          When your donation is confirmed you should receive
          the confirmation message from us within a few minutes
          in your PayPal account email.
          Don&apos;t forget to check your spam box.
          If you don&apos;t receive it, please check in your PayPal account
          if the donation went successfully or contact us:&nbsp;
          <ContactButton customText="" />
        </p>
        <p>If you didn&apos;t donate yet, follow the PayPal button below to make your donation:</p>
        <iframe
          title="PayPal Donation Buttons"
          src={`${iframe.src}#!/${openingKey}`}
          className={iframe.classList.toString()}
          height="33px"
        />
        <p>
          {this.renderEmail()}
          You can add more emails to receive the video if you want,
          just go back and request it for another email.
          The link to download will also be available on this page when it&apos;s ready.
        </p>
      </div>
    );
  }

  render() {
    const { donate } = this.props;
    return (
      <div>
        {donate ? this.renderDonate() : this.renderDidNotDonate() }
        <TermsOfServiceAcceptance />
        <div className="center">
          <button onClick={this.handleOkButton}>OK</button>
          <button onClick={this.handleAddEmailButton}>Add another Email</button>
        </div>
      </div>
    );
  }
}

export default VideoRequestSent;
