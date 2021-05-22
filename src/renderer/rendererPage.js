import 'babel-polyfill';
import '../styles/main.styl';
import * as Sentry from '@sentry/browser';
import ViewController from '../js/ViewController';
import { loadOpening } from '../js/api/actions';
import AudioController from '../js/AudioController';

const { audio } = AudioController;
AudioController.audio = null;

Sentry.config({
  dsn: 'https://22f6d6b2f526429bae4941c3595bc7fb@o152641.ingest.sentry.io/1204808',
  ignoreErrors: [],
  ignoreUrls: [],
  release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572-render',
});

const setCSSVariable = (variableName, value) => {
  document.documentElement.style.setProperty(variableName, value);
};

window.playIntro = (opening) => {
  ViewController.playOpening(opening);
  document.querySelector('html').classList.remove('not-ready');
};

window.previewIntro = async ({ key = 'BLz2gfYtRmFeXOjF6FH1', timeFactor = 1, section }) => {
  setCSSVariable('--time-factor', timeFactor);

  if (section === 'logo') {
    setCSSVariable('--intro-background-duration', '0s');
    setCSSVariable('--intro-text-duration', '0s');
    setCSSVariable('--intro-text-delay', '0s');
    setCSSVariable('--intro-logo-delay', '0s');
  } else if (section === 'ending') {
    setCSSVariable('--intro-background-duration', '0s');
    setCSSVariable('--intro-text-duration', '0s');
    setCSSVariable('--intro-text-delay', '0s');
    setCSSVariable('--intro-logo-duration', '0s');
    setCSSVariable('--intro-logo-delay', '0s');
    setCSSVariable('--intro-crawl-duration', '0s');
    setCSSVariable('--intro-crawl-delay', '0s');
    setCSSVariable('--intro-ending-duration', '0s');
    setCSSVariable('--intro-ending-delay', '0s');
  }

  const opening = await loadOpening(key);
  if (opening) {
    window.playIntro(opening);
  }
};

window.turnOnAudio = () => {
  AudioController.audio = audio;
};
