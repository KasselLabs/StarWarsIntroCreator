import { setGAUser } from './googleanalytics';

const KEY = 'KasselLabsUser';

const Storage = {
  save: (data) => {
    const json = JSON.stringify(data);
    localStorage.setItem(KEY, json);
  },
  load: () => {
    const json = localStorage.getItem(KEY);
    return JSON.parse(json);
  },
};

export default class UserIdentifier {
  static _loadUser(appName) {
    const user = Storage.load();
    if (!user) {
      return this._createUser(appName);
    }
    return user;
  }

  static _createUser(appName) {
    const now = (new Date()).toISOString();

    const newUser = {
      createdAt: now,
      apps: {},
      lastEmail: null,
      emails: [],
    };

    if (appName) {
      newUser.apps[appName] = now;
    }

    Storage.save(newUser);

    return newUser;
  }

  static _getEmailId(user) {
    return user.emails[0];
  }

  static _setUserRaven(user) {
    if (!window.Raven) {
      return;
    }

    const email = this._getEmailId(user);
    if (email) {
      Raven.setUserContext({
        email,
      });
    }

    Raven.setExtraContext({ user });
  }

  static _setUserGtag(user) {
    const email = this._getEmailId(user);
    if (!email) {
      return;
    }
    setGAUser(email);
  }

  static setUser(appName) {
    const user = this._loadUser(appName);
    this._setUserRaven(user);
    this._setUserGtag(user);
  }

  static addEmail(email) {
    const user = this._loadUser();
    user.lastEmail = email;
    user.emails.push(email);
    Storage.save(user);
  }
}
