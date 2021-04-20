import React, { Fragment, useCallback, useRef } from 'react';
import { trackAddToCart } from '../api/tracking';
import PropTypes from 'prop-types';
import { paymentPageUrl } from '../config';
import Loader from './Loader';
import VideoOptions from './newFlow/VideoOptions';

const isNewDonateFlow = 'new' === window.paymentFlowAB;

const PaymentModule = ({ openingKey }) => {
  const iframeRef = useRef(null);

  const updatePaymentAmount = useCallback((amount) => {
    iframeRef.current.contentWindow.postMessage({ action: 'setAmount', payload: amount }, '*');

    trackAddToCart(amount);
  }, [iframeRef.current]);

  return (
    <Fragment>
      {isNewDonateFlow && <VideoOptions updatePaymentAmount={updatePaymentAmount} />}
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
          src={`${paymentPageUrl}?embed=true&app=star-wars&code=${openingKey}&amount=1000`}
          allowpaymentrequest="true"
        />
      </div>
      {!isNewDonateFlow && (
      <p>
        You will receive the confirmation and the video
        on the email you put in the form above.
        Please, confirm your email below.
      </p>
      )}
    </Fragment>
  );
};

PaymentModule.propTypes = {
  openingKey: PropTypes.string,
};

export default PaymentModule;
