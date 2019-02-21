import { h, Component } from 'preact';

import { loadDownloadStatus } from '../api/actions';
import { BUMPED } from './constants';

const PENDING = 0;
const CONFIRMED = 1;

class CheckForDonation extends Component {
  constructor() {
    super();

    this.state = {
      status: PENDING,
    };
  }

  componentDidMount() {
    this._fetchDownloadStatus();
  }

  _fetchDownloadStatus = async () => {
    const { openingKey } = this.props;
    const response = await loadDownloadStatus(openingKey);

    if (BUMPED === response.status) {
      this.setState({
        status: CONFIRMED,
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
        <div className="check-for-donation__verified">&#10003;</div>
        <b>Donation confimed!</b>
      </div>
    );

    return (
      <div className="check-for-donation">
        {status === CONFIRMED
          ? donationConfirmed
          : donationPending
        }
      </div>
    );
  }
}

export default CheckForDonation;
