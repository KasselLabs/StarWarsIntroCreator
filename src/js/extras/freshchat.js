export const loadChat = () => {
  if (window.fcWidget.isLoaded()) {
    return;
  }

  window.fcWidget.init({
    token: process.env.FRESHCHAT_TOKEN,
    host: 'https://wchat.freshchat.com',
    config: {
      cssNames: {
        widget: 'custom_fc_frame',
      },
    },
  });
};

export const destroyChat = () => {
  if (window.fcWidget.isLoaded()) {
    setTimeout(() => {
      window.fcWidget.destroy();
    }, 500);
  }
};
