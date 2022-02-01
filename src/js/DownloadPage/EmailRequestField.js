import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { requestIntroDownload } from '../api/actions';
import UserIdentifier from '../extras/UserIdentifier';
import { trackSubmitWithoutDonation } from '../api/tracking';

class EmailRequestField extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    const { openingKey, finishRequestHandle } = this.props;
    const emailField = document.querySelector('#emailRequestField #email');
    const email = emailField.value;
    const subscribeCheckbox = document.querySelector('#emailRequestField #subscribe-newsletter');
    const subscribeCheckboxValue = subscribeCheckbox.checked;

    // TODO submit to newsletter

    UserIdentifier.addEmail(email);

    let requestDownloadStatus;

    await swal({
      title: 'download request',
      text: `Requestion download for intro "${openingKey}"...`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onOpen: async () => {
        swal.showLoading();
        requestDownloadStatus = await requestIntroDownload(openingKey, email);
        if (requestDownloadStatus) {
          swal.hideLoading();
          swal.clickConfirm();

          if (requestDownloadStatus) {
            finishRequestHandle(requestDownloadStatus, email);
          }
        }
      },
    });
  }

  render() {
    const { buttonlabel = 'ADD EMAIL TO REQUEST' } = this.props;
    return (
      <div id="emailRequestField">
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insert your email here..."
            required
          />
          <div className="checkbox">
            <input className="regular-checkbox" type="checkbox" id="subscribe-newsletter" />
            <label htmlFor="subscribe-newsletter" />
            <label htmlFor="subscribe-newsletter">I agree to receive news from Kassel Labs services.</label>
          </div>
          <button>{buttonlabel}</button>
        </form>
      </div>
    );
  }
}

EmailRequestField.propTypes = {
  buttonlabel: PropTypes.string,
  openingKey: PropTypes.string,
  finishRequestHandle: PropTypes.func,
};

export default EmailRequestField;
