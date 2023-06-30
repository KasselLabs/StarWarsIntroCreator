import React, {
  Fragment, useCallback, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { trackAddToCart } from '../api/tracking';
import { paymentPageUrl } from '../config';
import Loader from './Loader';
import VideoOptions from './newFlow/VideoOptions';
import ImageUploadButton from './ImageUploadButton';

const PaymentModule = ({ openingKey }) => {
  const iframeRef = useRef(null);
  const [isCustomImage, setIsCustomImage] = useState(false);

  const updatePaymentAmount = useCallback((amount) => {
    iframeRef.current.contentWindow.postMessage({ action: 'setAmount', payload: amount }, '*');

    trackAddToCart(amount);

    setIsCustomImage(amount >= 40);
  }, [iframeRef.current]);

  return (
    <>
      <VideoOptions updatePaymentAmount={updatePaymentAmount} />
      {
        isCustomImage && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1em',
          }}
          >
            <p>
              Upload your custom image at the button below:
            </p>
            <ImageUploadButton />
          </div>
        )
      }
      <p>Fill the form below to pay:</p>
      <div className="payment-container">
        <div className="center">
          <Loader text="Loading payment form..." />
        </div>
        <iframe
          ref={iframeRef}
          className="stripe"
          id="stripeDonateIframe"
          title="Stripe Payment Form"
          src={`${paymentPageUrl}?embed=true&app=star-wars&code=${openingKey}&amount=1500`}
          allowpaymentrequest="true"
        />
      </div>
    </>
  );
};

PaymentModule.propTypes = {
  openingKey: PropTypes.string,
};

export default PaymentModule;
