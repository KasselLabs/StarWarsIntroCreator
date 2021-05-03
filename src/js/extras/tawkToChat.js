const CHAT_CLASS_NAME = '-chat-available';

const state = {
  email: null,
};

const handleRightFooterClassOnChatAvailable = (status) => {
  console.log({ status });
  const containsClass = document.querySelector('.rightFooter').classList.contains(CHAT_CLASS_NAME);
  if (status === 'offline' && containsClass) {
    document.querySelector('.rightFooter').classList.remove(CHAT_CLASS_NAME);
  }

  if (!containsClass) {
    document.querySelector('.rightFooter').classList.add(CHAT_CLASS_NAME);
  }
};

const TawkAPI = window.Tawk_API || {};
TawkAPI.onLoad = function () {
  console.log('Loaded tawk.to');
  const pageStatus = TawkAPI.getStatus();
  handleRightFooterClassOnChatAvailable(pageStatus);

  if (state.email) {
    TawkAPI.setAttributes({
      email: state.email,
    }, (error) => {
      console.error('Error on setting user email on tawk.to');
      console.error(error);
    });
  }
};

TawkAPI.onStatusChange = function (status) {
  handleRightFooterClassOnChatAvailable(status);
};

// eslint-disable-next-line import/prefer-default-export
export const setUserEmail = (email) => {
  if (!TawkAPI.setAttributes) {
    state.email = email;
    return;
  }

  TawkAPI.setAttributes({
    email,
  }, (error) => {
    console.error('Error on setting user email on tawk.to');
    console.error(error);
  });
};
