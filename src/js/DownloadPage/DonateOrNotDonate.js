import { h } from 'preact';

const DonateOrNotDonate = ({ yesDonateHandle, noDonateHandle, hideNoDonateOption = false }) => (
  <div>
    <p><b>You want to receive your video faster by donating or wait in the queue?</b></p>
    <div className="donateOrNotDonateButtons">
      <button onClick={yesDonateHandle}>Yes, donate!</button>
      {!hideNoDonateOption &&
        <button onClick={noDonateHandle}>
        No, I&apos;ll get in the queue!
        </button>
      }
    </div>
  </div>
);

export default DonateOrNotDonate;
