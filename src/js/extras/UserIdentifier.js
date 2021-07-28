import uniq from 'lodash.uniq';
import * as Sentry from '@sentry/browser';
import { setGAUser } from './googleanalytics';
import { setUserEmail } from './tawkToChat';

const KEY = 'KasselLabsUser';

const checkLocalStorageAvailability = () => {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const isLocalStorageAvailable = checkLocalStorageAvailability();

const Storage = {
  save: (data) => {
    if (!isLocalStorageAvailable) {
      return;
    }
    const json = JSON.stringify(data);
    localStorage.setItem(KEY, json);
  },
  load: () => {
    if (!isLocalStorageAvailable) {
      return null;
    }
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

  static _setSentryUser(user) {
    const email = this._getEmailId(user);
    if (email) {
      Sentry.setUser({
        email,
      });
    }
  }

  static _setUserGtag(user) {
    const email = this._getEmailId(user);
    if (!email) {
      return;
    }
    setGAUser(email);
  }

  static _setUserTawkTo(user) {
    const email = user.lastEmail;
    if (!email) {
      return;
    }

    setUserEmail(email);
  }

  static setUser(appName) {
    const user = this._loadUser(appName);
    this._setSentryUser(user);
    this._setUserGtag(user);
    this._setUserTawkTo(user);
  }

  static addEmail(email) {
    const user = this._loadUser();
    user.lastEmail = email;
    user.emails.push(email);
    user.emails = uniq(user.emails);
    Storage.save(user);
  }
}
