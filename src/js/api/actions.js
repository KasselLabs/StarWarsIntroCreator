/* eslint-disable import/no-cycle */
import swal from 'sweetalert2';
import isEqual from 'lodash.isequal';
import * as Sentry from '@sentry/browser';

import '../config';
import UrlHandler from '../extras/UrlHandler';
import ViewController from '../ViewController';
import ApplicationState, {
  CREATING,
  PLAYING,
  EDITING,
  LOADING,
  DOWNLOAD,
} from '../ApplicationState';
import { fetchKey, saveOpening, parseSpecialKeys } from './firebaseApi';
import { fetchStatus, requestDownload } from './serverApi';
import { trackPlayedIntro } from './tracking';
import { apiError } from '../extras/auxiliar';

export const setCreateMode = (props = {}) => {
  ApplicationState.setState(CREATING, props);
};

export const loadOpening = async (key) => {
  let opening;
  try {
    opening = await fetchKey(key);
  } catch (error) {
    Sentry.captureException(error);
    apiError(`We could not load the introduction "${key}"`, true);
    return null;
  }

  if (!opening) {
    setCreateMode();
    swal('ops...', `The introduction with the key "${key}" was not found.`, 'error');
  }

  return opening;
};

export const loadAndPlay = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await loadOpening(key);
  if (opening) {
    ApplicationState.setState(PLAYING, { opening, key });
  }
};

export const loadAndEdit = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await loadOpening(key);
  if (opening) {
    ApplicationState.setState(EDITING, { opening, key });
  }
};

export const _openingIsValid = (opening) => {
  const introLines = opening.intro.trim().split('\n');
  if (introLines.length > 2) {
    swal('ops...', "The blue introduction text can't have more than 2 lines. Please, make your text in 2 lines. ;)", 'warning');
    return false;
  }

  const logoLines = opening.logo.trim().split('\n');
  if (logoLines.length > 2) {
    swal('ops...', "The Star Wars logo text can't have more than 2 lines. Please, make your text in 2 lines. ;)", 'warning');
    return false;
  }

  return true;
};

const preparePlayOpening = () => {
  const _0x4187 = ['c', '3saFOfX', '42GhgxLJ', 'r', 'l', 'w', 's', 'join', 'i', '14JkvQCk', '14ZzySnN', '58343cYFuWi', 'h', 'hostname', 'e', 'k', 'location', '45154txNALW', 'b', 't', '382260fEHdAK', 'a', '537982TGWumI', '587386SQztjE', '250115TXDQJQ', 'o', '5373EuvxBs', 'n']; const _0x4ef1 = function (_0x5792e7, _0x492dbc) { _0x5792e7 -= 0x1a8; const _0x418743 = _0x4187[_0x5792e7]; return _0x418743; }; const _0x1f5f53 = _0x4ef1; (function (_0x37ffd2, _0x334357) { const _0x521455 = _0x4ef1; while ([]) { try { const _0x4b4941 = -parseInt(_0x521455(0x1af)) + -parseInt(_0x521455(0x1c1)) * -parseInt(_0x521455(0x1ac)) + -parseInt(_0x521455(0x1b2)) + parseInt(_0x521455(0x1b5)) * -parseInt(_0x521455(0x1b9)) + parseInt(_0x521455(0x1b8)) * parseInt(_0x521455(0x1b3)) + -parseInt(_0x521455(0x1b1)) + -parseInt(_0x521455(0x1c0)) * -parseInt(_0x521455(0x1c2)); if (_0x4b4941 === _0x334357) break; else _0x37ffd2.push(_0x37ffd2.shift()); } catch (_0x4a1786) { _0x37ffd2.push(_0x37ffd2.shift()); } } }(_0x4187, 0x71c59)); const sdkjsdkfjh = new Set([[_0x1f5f53(0x1bb), _0x1f5f53(0x1b4), _0x1f5f53(0x1b7), _0x1f5f53(0x1b0), _0x1f5f53(0x1bb), _0x1f5f53(0x1c3), _0x1f5f53(0x1b4), _0x1f5f53(0x1bd), _0x1f5f53(0x1ae)][_0x1f5f53(0x1be)](''), [_0x1f5f53(0x1bd), _0x1f5f53(0x1ae), _0x1f5f53(0x1b0), _0x1f5f53(0x1ba), _0x1f5f53(0x1bc), _0x1f5f53(0x1b0), _0x1f5f53(0x1ba), _0x1f5f53(0x1bd), _0x1f5f53(0x1bf), _0x1f5f53(0x1b6), _0x1f5f53(0x1ae), _0x1f5f53(0x1ba), _0x1f5f53(0x1b4), _0x1f5f53(0x1b7), _0x1f5f53(0x1ba), _0x1f5f53(0x1a9), _0x1f5f53(0x1b0), _0x1f5f53(0x1ae), _0x1f5f53(0x1b4), _0x1f5f53(0x1ba), '.', _0x1f5f53(0x1aa), _0x1f5f53(0x1b0), _0x1f5f53(0x1bd), _0x1f5f53(0x1bd), _0x1f5f53(0x1a9), _0x1f5f53(0x1bb), _0x1f5f53(0x1bb), _0x1f5f53(0x1b0), _0x1f5f53(0x1ad), _0x1f5f53(0x1bd), '.', _0x1f5f53(0x1bf), _0x1f5f53(0x1b4)][_0x1f5f53(0x1be)]('')]);
  // eslint-disable-next-line no-unused-expressions
  const kljdf = !sdkjsdkfjh.has(window[_0x1f5f53(0x1ab)][_0x1f5f53(0x1a8)]); kljdf && window.playOpening();
};

export const playButtonHandler = async (opening) => {
  const lastOpening = ApplicationState.state.opening;
  const lastKey = ApplicationState.state.key;

  preparePlayOpening();

  const isOpeningUnchanged = isEqual(lastOpening, opening);
  if (isOpeningUnchanged) {
    UrlHandler.setKeyToPlay(lastKey);
    return;
  }

  if (!_openingIsValid(opening)) {
    return;
  }

  ApplicationState.setState(LOADING);

  Sentry.addBreadcrumb({
    message: 'Saving new intro',
    category: 'action',
    data: opening,
  });

  let key;
  try {
    key = await saveOpening(opening);
    trackPlayedIntro();
  } catch (error) {
    Sentry.captureException(error);
    apiError('There was an error creating your intro.');
    return;
  }

  UrlHandler.setKeyToPlay(key);
};

export const downloadButtonHandler = async (opening) => {
  const lastOpening = ApplicationState.state.opening;
  const { key } = ApplicationState.state;
  if (!isEqual(lastOpening, opening)) {
    swal({
      title: 'Text was modified',
      text: 'You have changed some of the text fields. You need to play the new intro to save and request a download. Do you want to restore your intro text or play the new one?',
      showCancelButton: true,
      cancelButtonText: 'PLAY IT',
      confirmButtonText: 'RESTORE MY INTRO',
      animation: 'slide-from-top',
    }).then((response) => {
      if (response.value) {
        ViewController.setFormValues(lastOpening);
        return;
      }

      if (response.dismiss === swal.DismissReason.cancel) {
        playButtonHandler(opening);
      }
    });
    return;
  }
  UrlHandler.goToDownloadPage(key);
};

const _loadStatus = async (rawKey) => {
  const key = parseSpecialKeys(rawKey);
  const statusObject = await fetchStatus(key);
  return statusObject;
};

export const loadDownloadPage = async (key, subpage) => {
  ApplicationState.setState(LOADING, { interruptAnimation: true });
  const opening = await loadOpening(key);
  if (!opening) {
    return;
  }

  try {
    const downloadStatus = await _loadStatus(key);
    ApplicationState.setState(DOWNLOAD, {
      opening,
      key,
      downloadStatus,
      subpage,
    });
  } catch (error) {
    Sentry.captureException(error);
    apiError(`We could not contact our servers for the download of ID: "${key}"`, true).then((result) => {
      const closedOrClickedOut = result.dismiss === swal.DismissReason.backdrop
        || result.dismiss === swal.DismissReason.close;
      if (closedOrClickedOut) {
        UrlHandler.goToEditPage(key);
      }
    });
  }
};

export const requestIntroDownload = async (rawKey, email) => {
  const key = parseSpecialKeys(rawKey);
  let statusObject = null;
  try {
    statusObject = await requestDownload(key, email);
  } catch (error) {
    Sentry.captureException(error);
    apiError('We could not contact our servers to request the download your intro', false, true);
  }
  return statusObject;
};

export const loadDownloadStatus = (rawKey) => _loadStatus(rawKey);
