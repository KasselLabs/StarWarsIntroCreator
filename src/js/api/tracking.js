const _getVideoTypeByValue = (value) => {
  if (value >= 30) {
    return 'Custom Image'
  }

  if (value >= 10) {
    return 'Full HD'
  }

  if (value >= 7) {
    return 'HD'
  }

  // This should not happen
  return 'Low Donation'
}

export const trackSubmitWithoutDonation = () => {
  window.dataLayer.push({
    'event': 'submit_without_donating',
  })
}

export const trackPlayedIntro = () => {
  window.fbq('track', 'ViewContent', {
    content_name: 'Played Intro'
  });
}

export const trackOpenedDownloadModal = () => {
  window.fbq('track', 'ViewContent', {
    content_name: 'Opened Download Modal'
  })
}

export const trackAddToCart = (value) => {
  const videoType = _getVideoTypeByValue(value)

  window.dataLayer.push({
    'event': 'add_to_cart',
    'ecommerce': {
        'revenue': value,
        'items': [{
          'item_id': videoType,
          'price': value,
          'quantity': 1
        }]
    }
  });

  window.fbq('track', 'AddToCart', {
    content_ids: [videoType],
    currency: 'USD',
    content_type: 'product',
    value,
  });
}

export const trackPurchase = (value) => {
  const videoType = _getVideoTypeByValue(value)

  window.dataLayer.push({
    'event': 'purchase',
    'ecommerce': {
        'revenue': value,
        'items': [{
          'item_id': videoType,
          'price': value,
          'quantity': 1
        }]
    }
  });

  window.fbq('track', 'Purchase', {
    content_ids: [videoType],
    currency: 'USD',
    content_type: 'product',
    value,
  });
}