import { trackPurchase } from '../api/tracking';

const callbacks = {
  success: null,
};

const paymentEventsHandler = (event) => {
  if (!event.origin.match(/https:\/\/payment\.kassellabs\.io$/)) return;
  // if (!event.origin.match(/http:\/\/localhost:3000$/)) return;

  const { data } = event;
  if (data.type !== 'payment') {
    return;
  }

  if ('success' === data.action) {
    if (callbacks.success) {
      callbacks.success(data.payload);
    }

    trackPurchase(data.payload.finalAmount);
  }
};


export const registerPaymentEventsHandler = (paymentSuccessCallback) => {
  callbacks.success = paymentSuccessCallback;
  window.addEventListener('message', paymentEventsHandler);
};

export const unregisterPaymentEventsHandler = () => {
  window.removeEventListener('message', paymentEventsHandler);
};
