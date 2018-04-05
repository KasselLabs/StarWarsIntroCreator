window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

const gtagKey = 'UA-116931857-1';

if ('production' === process.env.NODE_ENV) {
  gtag('js', new Date());
  gtag('config', gtagKey);
}

const sendGAPageView = () => {
  if ('production' === process.env.NODE_ENV) {
    gtag('config', gtagKey, {
      page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    });
  }
};

export default sendGAPageView;
