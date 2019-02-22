
export default class UrlHandler {
  static _checkForWrongEncoded = () => {
    const hasWrongChar = window.location.hash.indexOf('#%21/') > -1;
    if (hasWrongChar) {
      const fixedHash = window.location.hash.replace('#%21/', '#!/');
      window.location.hash = fixedHash;
      window.location.reload();
    }
  }

  static getParams() {
    this._checkForWrongEncoded();
    const params = window.location.hash.replace('#!/', '').split('/');
    return {
      key: params[0] ? params[0] : null,
      page: params[1] ? params[1].toLowerCase() : null,
      subpage: params[2] ? params[2].toLowerCase() : null,
    };
  }

  static setKeyToPlay(key) {
    const hashBefore = window.location.hash.substr(1);
    const newHash = `!/${key}`;
    window.location.hash = newHash;
    // if is the same hash as before, reload the page to replay animation.
    if (hashBefore === newHash) {
      window.location.reload();
    }
  }

  static goToEditPage(key) {
    const newHashUrl = `!/${key}/edit`;
    window.location.hash = newHashUrl;
  }

  static goToDownloadPage(key, subpage = '') {
    const newHashUrl = `!/${key}/download/${subpage}`;
    window.location.hash = newHashUrl;
  }
}
