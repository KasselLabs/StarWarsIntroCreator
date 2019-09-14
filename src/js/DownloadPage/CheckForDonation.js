import React, { Component } from 'react';

import { loadDownloadStatus } from '../api/actions';
import { BUMPED, RENDERING } from './constants';

const PENDING = 0;
const CONFIRMED = 1;
const NOT_FOUND = 2;

class CheckForDonation extends Component {
  constructor() {
    super();

    this.state = {
      status: PENDING,
      startTime: Date.now(),
    };
  }

  componentDidMount() {
    this._fetchDownloadStatus();
  }

  _fetchDownloadStatus = async () => {
    const { openingKey } = this.props;
    const response = await loadDownloadStatus(openingKey);

    const isBumped = BUMPED === response.status;
    const isRenderingViaBump = RENDERING === response.status && response.bumped_on;

    if (isBumped || isRenderingViaBump) {
      this.setState({
        status: CONFIRMED,
      });
      return;
    }

    const now = Date.now();
    const elapsed = now - this.state.startTime;
    const oneMinute = 60000;

    if (elapsed > oneMinute) {
      this.setState({
        status: NOT_FOUND,
      });
      return;
    }

    setTimeout(this._fetchDownloadStatus, 3000);
  }

  render() {
    const { status } = this.state;
    const donationPending = (
      <div className="check-for-donation__card">
        <div className="check-for-donation__spinner" />
        <b>Checking for donation...</b>
      </div>
    );

    const donationConfirmed = (
      <div className="check-for-donation__card check-for-donation__card--verified">
        <div className="check-for-donation__icon">&#10003;</div>
        <b>Donation confimed!</b>
      </div>
    );

    const donationNotFound = (
      <div className="check-for-donation__card check-for-donation__card--not-found">
        <div className="check-for-donation__icon">X</div>
        <b>Donation not found! <br />
          Please, check if your payment was made successfully or try to donate again.
        </b>
      </div>
    );

    return (
      <div className="check-for-donation">
        {status === PENDING && donationPending}
        {status === CONFIRMED && donationConfirmed}
        {status === NOT_FOUND && donationNotFound}
      </div>
    );
  }
}

export default CheckForDonation;
