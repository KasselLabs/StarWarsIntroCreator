import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { paymentPageUrl } from '../config';
import Loader from './Loader';


const PaymentModule = ({ openingKey }) => (
  <Fragment>
    <p>Fill the form below to donate:</p>
    <div className="payment-container">
      <div className="center">
        <Loader text="Loading payment form..." />
      </div>
      <iframe
        className="stripe"
        id="stripeDonateIframe"
        title="Stripe Payment Form"
        src={`${paymentPageUrl}?embed=true&app=star-wars&code=${openingKey}&amount=1000`}
        allowpaymentrequest="true"
      />
    </div>
    <p>
      You will receive the confirmation and the video
      on the email you put in the form above.
      Please, confirm your email below.
    </p>
  </Fragment>
);

PaymentModule.propTypes = {
  openingKey: PropTypes.string,
};

export default PaymentModule;
