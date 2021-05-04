import { registerTawkEvent, registerTawkTag } from '../extras/tawkToChat';

const _getVideoTypeByValue = (value) => {
  if (value >= 30) {
    return 'Custom Image';
  }

  if (value >= 10) {
    return 'Full HD';
  }

  if (value >= 7) {
    return 'HD';
  }

  // This should not happen
  return 'Low Donation';
};

export const trackSubmitWithoutDonation = () => {
  window.dataLayer.push({
    event: 'submit_without_donating',
  });

  registerTawkEvent('submit-without-donating');
};

export const trackPlayedIntro = () => {
  window.fbq('track', 'ViewContent', {
    content_name: 'Played Intro',
  });

  registerTawkEvent('played-intro');
};

export const trackOpenedDownloadModal = () => {
  window.fbq('track', 'ViewContent', {
    content_name: 'Opened Download Modal',
  });

  registerTawkEvent('opened-download-modal');
};

export const trackAddToCart = (value) => {
  const videoType = _getVideoTypeByValue(value);

  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      value,
      items: [{
        item_id: videoType,
        price: value,
        quantity: 1,
      }],
    },
  });

  window.fbq('track', 'AddToCart', {
    content_ids: [videoType],
    currency: 'USD',
    content_type: 'product',
    value,
  });

  registerTawkEvent('add-to-cart', {
    videoType,
    value,
  });
};

export const trackPurchase = (value, currency) => {
  const videoType = _getVideoTypeByValue(value);

  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      value,
      currency,
      items: [{
        item_id: videoType,
        price: value,
        currency,
        quantity: 1,
      }],
    },
  });

  window.fbq('track', 'Purchase', {
    content_ids: [videoType],
    currency,
    content_type: 'product',
    value,
  });

  registerTawkEvent('purchase', {
    videoType,
    currency,
    value,
  });

  registerTawkTag('Donator');
};
