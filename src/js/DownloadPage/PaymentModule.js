import React, { Fragment, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { trackAddToCart } from '../api/tracking';
import { paymentPageUrl } from '../config';
import Loader from './Loader';
import VideoOptions from './newFlow/VideoOptions';

const PaymentModule = ({ openingKey }) => {
  const iframeRef = useRef(null);

  const updatePaymentAmount = useCallback((amount) => {
    iframeRef.current.contentWindow.postMessage({ action: 'setAmount', payload: amount }, '*');

    trackAddToCart(amount);
  }, [iframeRef.current]);

  return (
    <>
      <VideoOptions updatePaymentAmount={updatePaymentAmount} />
      <p>Fill the form below to donate:</p>
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
