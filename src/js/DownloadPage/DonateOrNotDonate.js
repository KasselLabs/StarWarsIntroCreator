import React from 'react';

const DonateOrNotDonate = ({ yesDonateHandle, noDonateHandle, hideNoDonateOption = false }) => (
  <div>
    <p><b>Do you want to receive your video faster by donating or wait in the queue?</b></p>
    <div className="donateOrNotDonateButtons">
      <button type="button" onClick={yesDonateHandle}>Yes, donate!</button>
      {!hideNoDonateOption
        && (
        <button type="button" onClick={noDonateHandle}>
        No, I{'\''}ll get in the queue!
        </button>
        )
      }
    </div>
  </div>
);

export default DonateOrNotDonate;
