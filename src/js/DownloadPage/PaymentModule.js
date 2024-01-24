import React, {
  Fragment, useCallback, useState, useRef, useEffect,
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
  const [customImage, setCustomImage] = useState('https://kassellabs.s3.amazonaws.com/star-wars/DeathStar-Background.png');

  const updatePaymentAmount = useCallback((amount) => {
    iframeRef.current.contentWindow.postMessage({ action: 'setAmount', payload: amount }, '*');

    trackAddToCart(amount);

    setIsCustomImage(amount >= 40);
  }, [iframeRef.current]);

  useEffect(() => {
    if (!customImage || !isCustomImage) {
      iframeRef.current.contentWindow.postMessage({ action: 'setCode', payload: openingKey }, '*');
      return;
    }

    const code = JSON.stringify({ code: openingKey, image: customImage });
    iframeRef.current.contentWindow.postMessage({ action: 'setCode', payload: code }, '*');
  }, [openingKey, customImage, isCustomImage]);

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
            <ImageUploadButton
              onChange={(newCustomImage) => {
                setCustomImage(newCustomImage);
              }}
            />
            <p>
              Preview your custom image:
            </p>
            <div
              style={{
                position: 'relative', width: '640px', height: '360px', overflow: 'hidden', borderRadius: '5px',
              }}
            >
              <iframe
                style={{
                  width: '1920px', height: '1080px', transformOrigin: '0 0', transform: 'scale(0.3333333333)',
                }}
                src={`https://star-wars-intro-creator-git-custom-image-iframe-kassellabs.vercel.app?image=${customImage}`}
                title="Custom Image"
                allowFullScreen
              />
            </div>
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
