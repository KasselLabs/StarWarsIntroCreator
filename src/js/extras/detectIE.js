const getIEVersion = () => {
  let rv = -1;
  if ('Microsoft Internet Explorer' === navigator.appName) {
    const ua = navigator.userAgent;
    /* eslint-disable-next-line */
    const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1);
    }
  } else if ('Netscape' === navigator.appName) {
    const ua = navigator.userAgent;
    /* eslint-disable-next-line */
    const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1);
    }
  }
  return rv;
};

const usingIE = () => -1 !== getIEVersion();

if (usingIE()) {
  /* eslint-disable-next-line */
  window.alert('This website is not compatible with Internet Explorer, please use Chrome. Sorry for the inconvenience.');
}
