import swal from 'sweetalert2';

import UrlHandler from './extras/UrlHandler';
import AudioController from './AudioController';
import { usingMSEdge } from './extras/auxiliar';
import { documentReady, urlHashChange } from './extras/utils';
import { loadAndPlay, loadDownloadPage, setCreateMode, loadAndEdit } from './api/actions';
import sendGAPageView from './extras/googleanalytics';
import { defaultOpening, defaultKey } from './config';
import ApplicationState, { PLAYING, EDITING } from './ApplicationState';

const startApplication = () => {
  urlHashChange(() => {
    sendGAPageView();
    swal.close();

    const { key, page } = UrlHandler.getParams();
    if (key) {
      if (!page) {
        loadAndPlay(key);
        return;
      }

      if ('edit' === page) {
        if (ApplicationState.state.key === key) {
          // interrupt animation if it's playing
          const interruptAnimation = !AudioController.audio.paused;
          ApplicationState.setState(EDITING, { interruptAnimation });
          return;
        }

        loadAndEdit(key);
        return;
      }

      if ('download' === page) {
        loadDownloadPage(key);
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
    window.dispatchEvent(new Event('hashchange'));
    if (usingMSEdge()) {
      swal(
        'microsoft edge',
        'This website is not optimized to work with Microsoft Edge, we recommend to use Chrome for the best experience. Sorry for the inconvenience.',
        'warning',
      );
    }
  });
};

export default startApplication;
