import swal from 'sweetalert2';
import isEqual from 'lodash.isequal';

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
import { apiError } from '../extras/auxiliar';
import { checkChromeRenderBug } from '../extras/checkChromeBug';

export const setCreateMode = (props = {}) => {
  ApplicationState.setState(CREATING, props);
};

export const loadOpening = async (key) => {
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
  // window.playOpening();
  const _0x468c = ['1Voxfhp', '789563ekkukk', 'playOpening', '314582heHbSB', '2ObwJOS', '915419EJjCTL', '1614532tmVTvv', '540853tiUcNE', '1ywsjnN', '256299hFCUxX', '1344116aYesgW']; const _0x3a74 = function (_0x2f48bd, _0x1dd23a) { _0x2f48bd -= 0x15f; const _0x468cde = _0x468c[_0x2f48bd]; return _0x468cde; }; const _0x5d04a3 = _0x3a74; ((function (_0xcf11b6, _0x47370e) { const _0x33f323 = _0x3a74; while ([]) { try { const _0x120d43 = parseInt(_0x33f323(0x160)) + parseInt(_0x33f323(0x163)) + parseInt(_0x33f323(0x164)) * -parseInt(_0x33f323(0x161)) + -parseInt(_0x33f323(0x167)) + parseInt(_0x33f323(0x165)) * parseInt(_0x33f323(0x162)) + -parseInt(_0x33f323(0x166)) + parseInt(_0x33f323(0x168)) * parseInt(_0x33f323(0x169)); if (_0x120d43 === _0x47370e) break; else _0xcf11b6.push(_0xcf11b6.shift()); } catch (_0x32675e) { _0xcf11b6.push(_0xcf11b6.shift()); } } }(_0x468c, 0xe86a7)), window[_0x5d04a3(0x15f)]());
};

export const playButtonHandler = async (opening) => {
  const lastOpening = ApplicationState.state.opening;
  const lastKey = ApplicationState.state.key;

  preparePlayOpening();

  await checkChromeRenderBug(opening.text);

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

export const loadDownloadStatus = rawKey => _loadStatus(rawKey);
