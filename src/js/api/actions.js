import swal from 'sweetalert2';
import isEqual from 'lodash.isequal';

import UrlHandler from '../extras/UrlHandler';
import ViewController from '../ViewController';
import ApplicationState, { CREATING, PLAYING, EDITING, LOADING, DOWNLOAD } from '../ApplicationState';
import { fetchKey, saveOpening, parseSpecialKeys } from './firebaseApi';
import { fetchStatus, requestDownload } from './serverApi';
import { apiError } from '../extras/auxiliar';

export const setCreateMode = (props = {}) => {
  ApplicationState.setState(CREATING, props);
};

const _loadOpening = async (key) => {
  let opening;
  try {
    opening = await fetchKey(key);
  } catch (error) {
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
  const opening = await _loadOpening(key);
  if (opening) {
    ApplicationState.setState(PLAYING, { opening, key });
  }
};

export const loadAndEdit = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await _loadOpening(key);
  if (opening) {
    ApplicationState.setState(EDITING, { opening, key });
  }
};

export const _openingIsValid = (opening) => {
  const introLines = opening.intro.split('\n');
  if (introLines.length > 2) {
    swal('ops...', "The blue introduction text can't have more than 2 lines. Please, make your text in 2 lines. ;)", 'warning');
    return false;
  }

  const logoLines = opening.logo.split('\n');
  if (logoLines.length > 2) {
    swal('ops...', "The Star Wars logo text can't have more than 2 lines. Please, make your text in 2 lines. ;)", 'warning');
    return false;
  }

  return true;
};

export const playButtonHandler = async (opening) => {
  const lastOpening = ApplicationState.state.opening;
  const lastKey = ApplicationState.state.key;

  const isOpeningUnchanged = isEqual(lastOpening, opening);
  if (isOpeningUnchanged) {
    UrlHandler.setKeyToPlay(lastKey);
    return;
  }

  if (!_openingIsValid(opening)) {
    return;
  }

  ApplicationState.setState(LOADING);

  Raven.captureBreadcrumb({
    message: 'Saving new intro',
    category: 'action',
    data: opening,
  });

  let key;
  try {
    key = await saveOpening(opening);
  } catch (error) {
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
      text: 'You have changed some of the text fields. You need to play the your new intro to save and request a download. Do you want to restore your intro or play the new one?',
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

export const loadDownloadPage = async (key) => {
  ApplicationState.setState(LOADING);
  const opening = await _loadOpening(key);
  if (!opening) {
    return;
  }

  try {
    const downloadStatus = await _loadStatus(key);
    ApplicationState.setState(DOWNLOAD, { opening, key, downloadStatus });
  } catch (error) {
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
    apiError('We could not contact our servers to request the download your intro', false, true);
  }
  return statusObject;
};
