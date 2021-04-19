import React from 'react';
import PropTypes from 'prop-types';

const DonateOrNotDonate = ({
  question = 'Did you complete the payment or prefer to wait in queue?',
   yesText = "Yes, confirm payment!",
   noText = "No, I'll wait in the queue!",
   yesDonateHandle,
   noDonateHandle,
   hideNoDonateOption = false
  }) => (
  <div>
    <p><b>{question}</b></p>
    <div className="donateOrNotDonateButtons">
      <button type="button" onClick={yesDonateHandle}>{yesText}</button>
      {!hideNoDonateOption
        && (
        <button type="button" onClick={noDonateHandle}>
          {noText}
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
  question: PropTypes.string,
  yesText: PropTypes.string,
  noText: PropTypes.string,
};

export default DonateOrNotDonate;
