import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  donateButton = () => {
    const { openingKey } = this.props;
    UrlHandler.goToDownloadPage(openingKey, 'donate');
  };

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
          in your email.
          Don&apos;t forget to check your spam box.
          If you don&apos;t receive it, please check
          if the donation went successfully or contact us:&nbsp;
          <ContactButton customText="" />
        </p>
        <p>If you didn&apos;t donate yet, click on the button below to make your donation:</p>
        <div className="center">
          <button type="button" onClick={this.donateButton}>Donate</button>
        </div>
        <p>
          {this.renderEmail()}
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
      </div>
    );
  }
}

VideoRequestSent.propTypes = {
  openingKey: PropTypes.string,
  requestStatus: PropTypes.object,
  requestEmail: PropTypes.string,
  donate: PropTypes.bool,
};

export default VideoRequestSent;
