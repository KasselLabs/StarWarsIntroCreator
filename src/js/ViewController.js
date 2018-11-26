import { defaultOpening } from './config';
import { callOnFocus, isFromBrazil } from './extras/utils';
import AudioController from './AudioController';
import ApplicationState from './ApplicationState';
import UrlHandler from './extras/UrlHandler';
import { playButtonHandler, downloadButtonHandler } from './api/actions';
import StarWarsAnimation from './StarWarsAnimation';
import { mountDownloadPage, unmountDownloadPage } from './mountDownloadPage';
import bitcoinEther from './extras/bitcoinEther';

class ViewController {
  constructor() {
    this.body = document.querySelector('body');
    this.downloadButton = document.querySelector('#downloadButton');
    this.requestInteractionButton = document.querySelector('#requestInteractionButton');
    this.form = document.querySelector('#configForm > form');

    this.formFields = {
      intro: document.querySelector('#f-intro'),
      logo: document.querySelector('#f-logo'),
      episode: document.querySelector('#f-episode'),
      title: document.querySelector('#f-title'),
      text: document.querySelector('#f-text'),
      center: document.querySelector('#f-center'),
    };

    this.starWarsAnimation = new StarWarsAnimation();

    if (window.renderer) {
      return;
    }

    this.formFields.center.addEventListener('change', (e) => {
      this._setFormTextAlignment(e.target.checked);
    });

    this.setFormValues(defaultOpening);

    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const opening = this.getFormValues();
      playButtonHandler(opening);
    });

    this.downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      const opening = this.getFormValues();
      downloadButtonHandler(opening);
    });

    // paypal show Doar if is brazilian
    if (isFromBrazil()) {
      const paypalButtons = document.querySelector('#paypalDonateBRL');
      const iframe = document.querySelector('#paypalDonateIframe');
      paypalButtons.classList.add('show');
      iframe.classList.add('isBrazil');
    }

    // close download page button
    document.querySelector('#closeButton')
      .addEventListener('click', (e) => {
        e.preventDefault();
        UrlHandler.goToEditPage(ApplicationState.state.key);
      });

    // bitcoin and ether button
    document.querySelector('#btcether').addEventListener('click', bitcoinEther);
  }

  setLoading() {
    this.body.classList.add('loading');
  }

  unsetLoading() {
    this.body.classList.remove('loading');
  }

  setRunningVideo() {
    this.body.classList.add('runningVideo');
  }

  unsetRunningVideo() {
    this.body.classList.remove('runningVideo');
    this.body.classList.remove('showForm');
  }

  requestWindowInteraction() {
    this.body.classList.add('requestInteraction');

    return new Promise((resolve) => {
      if (!this.requestInteractionButton) {
        resolve();
        return;
      }
      const listener = this.requestInteractionButton.addEventListener('click', () => {
        this.requestInteractionButton.removeEventListener('click', listener, true);
        resolve();
      });
    });
  }

  _unsetRequestWindowInteraction() {
    this.body.classList.remove('requestInteraction');
  }

  setDownloadPage() {
    mountDownloadPage();
    this.body.classList.add('downloadPage');
  }

  unsetDownloadPage() {
    this.body.classList.remove('downloadPage');
    unmountDownloadPage();
  }

  showDownloadButton() {
    this.downloadButton.classList.add('show');
  }

  hideDownloadButton() {
    this.downloadButton.classList.remove('show');
  }

  getFormValues = () => ({
    intro: this.formFields.intro.value,
    logo: this.formFields.logo.value,
    episode: this.formFields.episode.value,
    title: this.formFields.title.value,
    text: this.formFields.text.value,
    center: this.formFields.center.checked,
  });

  setFormValues(opening) {
    this.formFields.intro.value = opening.intro;
    this.formFields.logo.value = opening.logo;
    this.formFields.episode.value = opening.episode;
    this.formFields.title.value = opening.title;
    this.formFields.text.value = opening.text;
    this.formFields.center.checked = opening.center;

    this._setFormTextAlignment(opening.center);
  }

  _setFormTextAlignment(centralizedText) {
    this.formFields.text.style.textAlign = centralizedText ? 'center' : 'justify';
  }

  playOpening(opening) {
    window.scrollTo(0, 0);
    this.starWarsAnimation.load(opening);
    this.requestWindowInteraction();

    return new Promise((resolve, reject) => {
      callOnFocus(async () => {
        this._unsetRequestWindowInteraction();
        this.setRunningVideo();

        await AudioController.canPlay();

        this.starWarsAnimation.play();
        try {
          await AudioController.play();
        } catch (e) {
          this._resetAnimation();
          const error = new Error('AutoPlayError');
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  _resetAnimation() {
    this.unsetRunningVideo();
    this.starWarsAnimation.reset();
  }

  killTimers() {
    clearTimeout(this.showFormTimeout);
    clearTimeout(this.resetAnimationTimeout);
  }

  stopPlaying(interruptAnimation) {
    const showForm = () => {
      this.body.classList.add('showForm');
    };

    if (interruptAnimation) {
      showForm();
      this._resetAnimation();
      AudioController.reset();
      return;
    }

    this.showFormTimeout = setTimeout(() => {
      showForm();
      this.resetAnimationTimeout = setTimeout(() => {
        this._resetAnimation();
      }, 6000);
    }, 2000);
  }
}

export default new ViewController();
