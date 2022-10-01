import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { calculateTimeToRender } from '../../extras/auxiliar';
import TermsOfServiceAcceptance from '../TermsOfServiceAcceptance';
import ContactButton from '../ContactButton';
import UrlHandler from '../../extras/UrlHandler';
import Atat from '../Atat';
import SocialButtons from '../SocialButtons';

class VideoRequestSent extends Component {
  constructor(props) {
    super(props);

    const { donate, paymentData, openingKey } = props;
    if (donate && !paymentData) {
      UrlHandler.goToDownloadPage(openingKey, 'pay');
    }
  }

  handleOkButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToEditPage(openingKey);
  }

  handleAddEmailButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToDownloadPage(openingKey, 'add_email');
  }

  donateButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToDownloadPage(openingKey, 'pay');
  };

  renderEmail() {
    const { requestEmail } = this.props;

    if (!requestEmail) {
      return null;
    }

    return (
      <span>
        The link to download the video will be sent to the email:
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
        <Atat />
        Your video request has been queued!
        Your current position on the queue is
        {' '}
        <b>{queuePosition}</b>
        ,
        and may take up to
        {' '}
        {timeToRender}
        {' '}
        to send your video.
        {this.renderEmail()}
        The link to download will also be available on this page when it&apos;s ready.
        You can add more emails to receive the video if you want in the button below.
      </p>
    );
  }

  renderDonate() {
    const { paymentData } = this.props;
    if (!paymentData) {
      return null;
    }

    const { method, receiptURL } = paymentData;

    const isPaypal = method === 'paypal';
    const hasReceiptURL = !!receiptURL;

    return (
      <div>
        <p>
          Thank you so much for supporting us!
          Your video should be rendered soon!
        </p>
        <p>{this.renderEmail()}</p>

        {isPaypal
        && (
          <p>
            Check your PayPal account for the receipt. You will also receive the video
            on your PayPal email.
          </p>
        )}

        {hasReceiptURL
        && (
        <>
          <p>
            Check your payment receipt on the link below.
            It was also sent to your email address.
          </p>
          <div className="center">
            <a href={receiptURL} target="_blank" rel="noopener noreferrer">
              <button type="button">Payment Receipt</button>
            </a>
          </div>
        </>
        )}

        <p>
          <ContactButton
            customText="Need any help? Please check our"
            endText="page"
          />
        </p>

        <p>
          You can add more emails to receive the video if you want.
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
          <button type="button" onClick={this.handleOkButton}>OK</button>
          <button type="button" onClick={this.handleAddEmailButton}>Add another Email</button>
        </div>
        <SocialButtons
          text="Don't forget to follow us on social media below to get our latest updates."
        />
      </div>
    );
  }
}

VideoRequestSent.propTypes = {
  openingKey: PropTypes.string,
  requestStatus: PropTypes.object,
  requestEmail: PropTypes.string,
  donate: PropTypes.bool,
  paymentData: PropTypes.object,
};

export default VideoRequestSent;
