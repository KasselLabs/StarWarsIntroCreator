import React from 'react';
import PropTypes from 'prop-types';

const DonateOrNotDonate = ({ yesDonateHandle, noDonateHandle, hideNoDonateOption = false }) => (
  <div>
    <p><b>Did you complete the payment or prefer to wait in queue?</b></p>
    <div className="donateOrNotDonateButtons">
      <button type="button" onClick={yesDonateHandle}>Yes, confirm payment!</button>
      {!hideNoDonateOption
        && (
        <button type="button" onClick={noDonateHandle}>
          No, I'll wait in the queue!
        </button>
        )
      }
    </div>
  </div>
);

DonateOrNotDonate.propTypes = {
  yesDonateHandle: PropTypes.func,
  noDonateHandle: PropTypes.func,
  hideNoDonateOption: PropTypes.bool,
};

export default DonateOrNotDonate;
