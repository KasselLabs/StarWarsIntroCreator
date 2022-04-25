import 'babel-polyfill';
import '../styles/main.styl';
import ViewController from '../js/ViewController';
import { loadOpening } from '../js/api/actions';
import AudioController from '../js/AudioController';

const { audio } = AudioController;
AudioController.audio = null;

const setCSSVariable = (variableName, value) => {
  document.documentElement.style.setProperty(variableName, value);
};

const waitUntilElementExists = (selector) => new Promise((resolve) => {
  let intervalId = null;

  const resolveIfExists = () => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(intervalId);
      resolve(element);
    }
  };

  intervalId = setInterval(resolveIfExists, 100);
  resolveIfExists();
});

window.playIntro = async (opening) => {
  if (opening.timeFactor) {
    setCSSVariable('--time-factor', opening.timeFactor);
  }

  ViewController.playOpening(opening);

  if (opening.image) {
    const deathStarElement = await waitUntilElementExists('#deathstar');
    deathStarElement.src = opening.image.url;

    if (opening.image.height) {
      deathStarElement.style.height = `${opening.image.height}px`;
      deathStarElement.style.width = 'auto';
    }

    if (opening.image.center) {
      const backgroundSpaceElement = await waitUntilElementExists('#backgroundSpace');
      backgroundSpaceElement.style.display = 'flex';
      backgroundSpaceElement.style.alignItems = 'flex-start';
      backgroundSpaceElement.style.justifyContent = 'center';
      deathStarElement.style.position = 'initial';

      if (opening.image.height) {
        deathStarElement.style.marginTop = `calc(var(--scrolldown-height) + 50vh - ${opening.image.height / 2}px)`;
      }
    }
  }
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
