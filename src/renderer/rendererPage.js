import 'babel-polyfill';
import '../styles/main.styl';
import ViewController from '../js/ViewController';
import { loadOpening } from '../js/api/actions';
import AudioController from '../js/AudioController';

const { audio } = AudioController;
AudioController.audio = null;

window.Raven = {
  captureBreadcrumb: () => {},
};

const setCSSVariable = (variableName, value) => {
  document.documentElement.style.setProperty(variableName, value);
};

window.playIntro = (opening, timeFactor) => {
  if (timeFactor) {
    setCSSVariable('--time-factor', timeFactor);
  }

  ViewController.playOpening(opening);
};

window.previewIntro = async ({ key = 'BLz2gfYtRmFeXOjF6FH1', timeFactor = 1, section }) => {
  setCSSVariable('--time-factor', timeFactor);

  if ('logo' === section) {
    setCSSVariable('--intro-background-duration', '0s');
    setCSSVariable('--intro-text-duration', '0s');
    setCSSVariable('--intro-text-delay', '0s');
    setCSSVariable('--intro-logo-delay', '0s');
  } else if ('ending' === section) {
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

window.addEventListener('keydown', (e) => {
  const TAB_CODE = 9;
  const SHIFT_CODE = 16;
  const CTRL_CODE = 17;
  const ALT_CODE = 18;

  switch (e.keyCode) {
    case TAB_CODE:
      previewIntro({ section: 'ending' });
      break;
    case SHIFT_CODE:
      previewIntro({ section: 'logo' });
      break;
    case CTRL_CODE:
      previewIntro({});
      break;
    case ALT_CODE:
      previewIntro({ timeFactor: 0.1 });
      break;
  }
});
