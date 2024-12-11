import React, {
  Fragment, useCallback, useState, useRef, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core';
import { useElementSize } from 'usehooks-ts';
import { trackAddToCart } from '../api/tracking';
import { paymentPageUrl } from '../config';
import Loader from './Loader';
import VideoOptions from './newFlow/VideoOptions';
import ImageUploadButton from './ImageUploadButton';

const PaymentModule = ({ openingKey }) => {
  const iframeRef = useRef(null);
  const [isCustomImage, setIsCustomImage] = useState(false);
  const [utmParamsString, setUtmParamsString] = useState('');
  const [isLoadingCustomImagePreview, setIsLoadingCustomImagePreview] = useState(true);
  const [imagePreviewRef, imagePreviewSize] = useElementSize();

  const transformScale = useMemo(() => (
    imagePreviewSize?.width / 1920
  ), [imagePreviewSize?.width]);

  const [customImage, setCustomImage] = useState('https://kassellabs.us-east-1.linodeobjects.com/static-assets/star-wars/DeathStar-Background.png');

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

  useEffect(() => {
    if (!isCustomImage) {
      return () => {};
    }

    const onMessage = (event) => {
      const isAnimationType = event.data?.type === 'animation';
      const isFinishedAction = event.data?.action === 'finished';

      if (isAnimationType && isFinishedAction) {
        setIsLoadingCustomImagePreview(false);
      }
    };
    window.addEventListener('message', onMessage);
    setIsLoadingCustomImagePreview(true);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [customImage, isCustomImage]);

  useEffect(() => {
    const savedParamsString = localStorage.getItem('saved-utm-params');
    if (!savedParamsString) {
      return;
    }

    try {
      const savedUtmParams = JSON.parse(savedParamsString);
      const params = new URLSearchParams(savedUtmParams);
      const paramsString = params.toString();
      if (paramsString) {
        setUtmParamsString(`&${paramsString}`);
      }
    } catch (error) {
      // Supress any errors here
    }
  }, []);

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
              className="image-preview-container"
              ref={imagePreviewRef}
            >
              <iframe
                style={{
                  width: '1920px',
                  height: '1080px',
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  transformOrigin: 'top left',
                  transform: `scale(${transformScale})`,
                  margin: '0',
                }}
                src={`https://star-wars-intro-creator-git-custom-image-iframe-kassellabs.vercel.app?image=${customImage}`}
                title="Custom Image"
                allowFullScreen
              />
              {isLoadingCustomImagePreview && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  left={0}
                  top={0}
                  bottom={0}
                  right={0}
                >
                  <CircularProgress />
                </Box>
              )}
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
          src={`${paymentPageUrl}?embed=true&app=star-wars&code=${openingKey}&amount=1500${utmParamsString}`}
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
