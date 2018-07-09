window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

const gtagKey = 'UA-116931857-1';

const prod = 'production' === process.env.NODE_ENV;

if (prod) {
  gtag('js', new Date());
  gtag('config', gtagKey);
}

export const sendGAPageView = () => {
  if (!prod) {
    return;
  }

  gtag('event', 'page_view', {
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
  });
};

export const setGAUser = (userId) => {
  gtag('set', { user_id: userId });
};

