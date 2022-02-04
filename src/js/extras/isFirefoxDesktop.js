const getUserAgent = () => navigator.userAgent || navigator.vendor || window.opera;

export const isAndroidOrIos = () => {
  const userAgent = getUserAgent();

  if (/android/i.test(userAgent)) {
    return true;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return true;
  }

  return false;
};

const isFirefoxDesktop = () => {
  const userAgent = getUserAgent();

  return Boolean(userAgent.match(/Firefox/g)) && !isAndroidOrIos();
};

export default isFirefoxDesktop;
