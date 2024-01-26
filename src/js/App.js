import swal from 'sweetalert2';
import bowser from 'bowser';

import { sendGAPageView } from './extras/googleanalytics';
import ApplicationState, { PLAYING, EDITING, GENERATE_TEXT } from './ApplicationState';
import UrlHandler from './extras/UrlHandler';
import UserIdentifier from './extras/UserIdentifier';
import AudioController from './AudioController';
import { documentReady, urlHashChange } from './extras/utils';
import {
  loadAndPlay,
  loadDownloadPage,
  setCreateMode,
  loadAndEdit,
} from './api/actions';
import { defaultOpening, defaultKey } from './config';

let lastPage = '';

const startApplication = () => {
  UserIdentifier.setUser('SWIC');
  urlHashChange(() => {
    sendGAPageView();
    swal.close();

    const { key, page, subpage } = UrlHandler.getParams();

    if (key) {
      if (key === 'suggest-text') {
        ApplicationState.setState(GENERATE_TEXT);
        return;
      }

      if (!page) {
        lastPage = '';
        loadAndPlay(key);
        return;
      }

      if (page === 'edit') {
        lastPage = page;
        if (ApplicationState.state.key === key) {
          // interrupt animation if it's playing
          const interruptAnimation = !AudioController.audio.paused;
          ApplicationState.setState(EDITING, { interruptAnimation });
          return;
        }

        loadAndEdit(key);
        return;
      }

      if (page === 'download') {
        const samePage = lastPage === page;

        if (samePage) {
          return;
        }

        lastPage = page;
        loadDownloadPage(key, subpage, samePage);
        return;
      }
    }

    if (ApplicationState.state.page === PLAYING) {
      setCreateMode({ interruptAnimation: true });
      return;
    }

    setCreateMode({
      opening: defaultOpening,
      key: defaultKey,
    });
  });

  documentReady(() => {
    if (!window.isIE) {
      window.dispatchEvent(new Event('hashchange'));
    }

    if (bowser.msedge) {
      swal(
        'microsoft edge',
        'This website is not optimized to work with Microsoft Edge, we recommend to use Firefox or Chrome for the best experience. Sorry for the inconvenience.',
        'warning',
      );
    }
  });
};

export default startApplication;
