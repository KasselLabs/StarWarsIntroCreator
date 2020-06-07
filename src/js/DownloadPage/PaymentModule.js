import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { paymentPageUrl } from '../config';
import Loader from './Loader';

const STRIPE = 1;
const PAYPAL = 2;

class PaymentModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethod: STRIPE,
    };
  }

  switchPaymentMethod = paymentMethod => () => {
    this.setState({ paymentMethod });
  };

  render() {
    const { openingKey } = this.props;
    const { paymentMethod } = this.state;

    const isStripe = paymentMethod === STRIPE;
    const isPayPal = paymentMethod === PAYPAL;

    const iframePaypalButtons = document.querySelector('#paypalDonateIframe');

    return (
      <Fragment>
        <div className="center">
          <button onClick={this.switchPaymentMethod(STRIPE)} type="button" className={isStripe ? 'active' : null}>Credit Card</button>
          <button onClick={this.switchPaymentMethod(PAYPAL)} type="button" className={isPayPal ? 'active' : null}>PayPal</button>
        </div>
        {isPayPal
          && (
          <Fragment>
            <p><b>Click</b> on the following PayPal button to donate:</p>
            <iframe
              title="PayPal Donation Buttons"
              src={`${iframePaypalButtons.src}#!/${openingKey}`}
              className={iframePaypalButtons.classList.toString()}
              height="33px"
            />
            <p>
              <b>Make sure to check on your PayPal account if the donation went successfully.</b>
            </p>
            <p>
              You will receive the confirmation and the video
              on the email registered with your PayPal account.
              Please, confirm your email below.
            </p>
          </Fragment>
          )
        }
        {isStripe && (
          <Fragment>
            <p>Fill the form below to donate:</p>
            <div className="compose-iframe">
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
        )}
      </Fragment>
    );
  }
}

PaymentModule.propTypes = {
  openingKey: PropTypes.string,
};

export default PaymentModule;
