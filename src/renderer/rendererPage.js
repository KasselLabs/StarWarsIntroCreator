import '../styles/main.styl';
import ViewController from '../js/ViewController';
import { loadOpening } from '../js/api/actions';

window.Raven = {
  captureBreadcrumb: () => {},
};

window.playIntro = (opening) => {
  ViewController.playOpening(opening);
};

window.loadAndPlay = async (key) => {
  const opening = await loadOpening(key);
  if (opening) {
    window.playIntro(opening);
  }
};

