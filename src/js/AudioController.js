import devtools from 'devtools-detect';
import * as Sentry from '@sentry/browser';

// import { isAndroidOrIos } from './extras/isFirefoxDesktop';

const isIframe = window.location !== window.parent.location;

// const isAndroidOrIosValue = isAndroidOrIos();

Sentry.addBreadcrumb({
  message: 'Devtools and Iframe tests',
  category: 'info',
  data: { isDevToolsOpen: devtools.isOpen, isIframe },
});

window.addEventListener('devtoolschange', (event) => {
  Sentry.addBreadcrumb({
    message: 'Devtools event change',
    category: 'info',
    data: { isDevToolsOpen: event.detail.isOpen },
  });
});

class AudioController {
  constructor() {
    this.audio = document.querySelector('#themeAudio');
    this.isLoaded = false;

    if (!this.audio) {
      return;
    }

    this.audioLoadPromise = new Promise((resolve) => {
      this.audio.oncanplaythrough = () => resolve();
    });

    this.audio.load();
    // this.audio.volume = 0;
    this.wmInterval = null;
    this.addWm();
  }

  loadAudio() {
    if (!this.isLoaded && this.audio) {
      this.audio.load();
      this.isLoaded = true;
    }
  }

  verificationFailed(error) {
    try {
      document.querySelector('#logo').remove();
      document.querySelector('.center-titles').remove();
      Sentry.captureException(error);
    } catch (error2) {
      console.error(error2);
    }
    clearInterval(this.wmInterval);
  }

  addWm() {
    const svgString = '<svg id="wtm" version="1.1" viewBox="0.0 0.0 592.7007874015748 101.25984251968504" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><clipPath id="p.0"><path d="m0 0l592.7008 0l0 101.25984l-592.7008 0l0 -101.25984z" clip-rule="nonzero"/></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l592.7008 0l0 101.25984l-592.7008 0z" fill-rule="evenodd"/><path fill="#000000" fill-opacity="0.0" d="m-11.398951 -17.388702l610.45667 0l0 86.01575l-610.45667 0z" fill-rule="evenodd"/><path fill="#fff" d="m30.113775 55.646294l-10.65625 10.9375l0 17.1875l-12.46875 0l0 -67.203125l12.46875 0l0 34.46875l33.21875 -34.46875l14.015625 0l-28.21875 30.046875l29.953125 37.15625l-14.59375 0l-23.718752 -28.125zm95.81209 -23.140625l0 51.265625l-11.421875 0l0 -6.625q-2.984375 3.65625 -7.359375 5.484375q-4.359375 1.8125 -9.640625 1.8125q-7.484375 0 -13.390625 -3.265625q-5.90625 -3.265625 -9.21875 -9.21875q-3.3125 -5.953125 -3.3125 -13.8125q0 -7.875 3.3125 -13.78125q3.3125 -5.90625 9.21875 -9.171875q5.90625 -3.265625 13.390625 -3.265625q5.0 0 9.171875 1.734375q4.171875 1.71875 7.25 5.078125l0 -6.234375l12.0 0zm-27.078125 41.671875q6.625 0 10.9375 -4.421875q4.328125 -4.421875 4.328125 -11.609375q0 -7.203125 -4.328125 -11.609375q-4.3125 -4.421875 -10.9375 -4.421875q-6.625 0 -10.890625 4.421875q-4.265625 4.40625 -4.265625 11.609375q0 7.1875 4.265625 11.609375q4.265625 4.421875 10.890625 4.421875zm58.668465 10.265625q-6.25 0 -12.203125 -1.625q-5.953125 -1.640625 -9.5 -4.140625l4.609375 -9.109375q3.453125 2.296875 8.296875 3.6875q4.859375 1.390625 9.5625 1.390625q10.75 0 10.75 -5.65625q0 -2.6875 -2.734375 -3.734375q-2.734375 -1.0625 -8.78125 -2.03125q-6.34375 -0.953125 -10.328125 -2.203125q-3.984375 -1.25 -6.921875 -4.359375q-2.921875 -3.125 -2.921875 -8.703125q0 -7.296875 6.09375 -11.65625q6.109375 -4.375 16.46875 -4.375q5.28125 0 10.5625 1.203125q5.28125 1.203125 8.640625 3.21875l-4.609375 9.125q-6.53125 -3.84375 -14.6875 -3.84375q-5.28125 0 -8.015625 1.59375q-2.734375 1.578125 -2.734375 4.15625q0 2.890625 2.921875 4.09375q2.9375 1.1875 9.078125 2.25q6.140625 0.953125 10.078125 2.203125q3.9375 1.25 6.765625 4.234375q2.828125 2.96875 2.828125 8.4375q0 7.203125 -6.234375 11.53125q-6.234375 4.3125 -16.984375 4.3125zm49.439972 0q-6.25 0 -12.203125 -1.625q-5.953125 -1.640625 -9.5 -4.140625l4.609375 -9.109375q3.453125 2.296875 8.296875 3.6875q4.859375 1.390625 9.5625 1.390625q10.75 0 10.75 -5.65625q0 -2.6875 -2.734375 -3.734375q-2.734375 -1.0625 -8.78125 -2.03125q-6.34375 -0.953125 -10.328125 -2.203125q-3.984375 -1.25 -6.921875 -4.359375q-2.921875 -3.125 -2.921875 -8.703125q0 -7.296875 6.09375 -11.65625q6.109375 -4.375 16.46875 -4.375q5.28125 0 10.5625 1.203125q5.28125 1.203125 8.640625 3.21875l-4.609375 9.125q-6.53125 -3.84375 -14.6875 -3.84375q-5.28125 0 -8.015625 1.59375q-2.734375 1.578125 -2.734375 4.15625q0 2.890625 2.921875 4.09375q2.9375 1.1875 9.078125 2.25q6.140625 0.953125 10.078125 2.203125q3.9375 1.25 6.765625 4.234375q2.828125 2.96875 2.828125 8.4375q0 7.203125 -6.234375 11.53125q-6.234375 4.3125 -16.984375 4.3125zm57.971222 -10.171875q8.359375 0 13.921875 -5.578125l6.34375 7.390625q-3.359375 4.140625 -8.640625 6.25q-5.28125 2.109375 -11.90625 2.109375q-8.453125 0 -14.890625 -3.359375q-6.421875 -3.359375 -9.9375 -9.359375q-3.5 -6.0 -3.5 -13.578125q0 -7.5 3.40625 -13.5q3.421875 -6.0 9.421875 -9.359375q6.0 -3.359375 13.578125 -3.359375q7.203125 0 13.109375 3.125q5.90625 3.125 9.359375 8.9375q3.453125 5.796875 3.453125 13.578125l-39.265625 7.671875q1.828125 4.421875 5.859375 6.734375q4.03125 2.296875 9.6875 2.296875zm-2.203125 -32.734375q-6.625 0 -10.703125 4.328125q-4.078125 4.3125 -4.078125 11.609375l0 0.09375l28.984375 -5.578125q-1.234375 -4.703125 -5.03125 -7.578125q-3.796875 -2.875 -9.171875 -2.875zm54.334717 42.90625q-7.96875 0 -12.4375 -4.359375q-4.453125 -4.375 -4.453125 -12.34375l0 -55.203125l12.0 0l0 54.34375q0 7.671875 7.203125 7.671875q2.390625 0 4.3125 -0.953125l0.578125 9.59375q-3.359375 1.25 -7.203125 1.25z" fill-rule="nonzero"/><path fill="#fff" d="m360.0766 16.568169l12.46875 0l0 56.640625l35.140625 0l0 10.5625l-47.609375 0l0 -67.203125zm106.45709 15.9375l0 51.265625l-11.421875 0l0 -6.625q-2.984375 3.65625 -7.359375 5.484375q-4.359375 1.8125 -9.640625 1.8125q-7.484375 0 -13.390625 -3.265625q-5.90625 -3.265625 -9.21875 -9.21875q-3.3125 -5.953125 -3.3125 -13.8125q0 -7.875 3.3125 -13.78125q3.3125 -5.90625 9.21875 -9.171875q5.90625 -3.265625 13.390625 -3.265625q5.0 0 9.171875 1.734375q4.171875 1.71875 7.25 5.078125l0 -6.234375l12.0 0zm-27.078125 41.671875q6.625 0 10.9375 -4.421875q4.328125 -4.421875 4.328125 -11.609375q0 -7.203125 -4.328125 -11.609375q-4.3125 -4.421875 -10.9375 -4.421875q-6.625 0 -10.890625 4.421875q-4.265625 4.40625 -4.265625 11.609375q0 7.1875 4.265625 11.609375q4.265625 4.421875 10.890625 4.421875zm71.23099 -42.25q7.5000305 0 13.3906555 3.265625q5.90625 3.265625 9.265625 9.21875q3.359375 5.953125 3.359375 13.734375q0 7.765625 -3.359375 13.765625q-3.359375 6.0 -9.265625 9.265625q-5.890625 3.265625 -13.3906555 3.265625q-5.265625 0 -9.640625 -1.8125q-4.375 -1.828125 -7.34375 -5.484375l0 6.625l-11.421875 0l0 -71.234375l12.0 0l0 26.203125q3.0625 -3.359375 7.234375 -5.078125q4.1875 -1.734375 9.171875 -1.734375zm-1.34375 42.25q6.6250305 0 10.8906555 -4.421875q4.28125 -4.421875 4.28125 -11.609375q0 -7.203125 -4.28125 -11.609375q-4.265625 -4.421875 -10.8906555 -4.421875q-4.3125 0 -7.765625 1.96875q-3.453125 1.953125 -5.46875 5.609375q-2.015625 3.640625 -2.015625 8.453125q0 4.796875 2.015625 8.453125q2.015625 3.640625 5.46875 5.609375q3.453125 1.96875 7.765625 1.96875zm54.637238 10.265625q-6.25 0 -12.203125 -1.625q-5.953125 -1.640625 -9.5 -4.140625l4.609375 -9.109375q3.453125 2.296875 8.296875 3.6875q4.859375 1.390625 9.5625 1.390625q10.75 0 10.75 -5.65625q0 -2.6875 -2.734375 -3.734375q-2.734375 -1.0625 -8.78125 -2.03125q-6.34375 -0.953125 -10.328125 -2.203125q-3.984375 -1.25 -6.921875 -4.359375q-2.921875 -3.125 -2.921875 -8.703125q0 -7.296875 6.09375 -11.65625q6.109375 -4.375 16.46875 -4.375q5.28125 0 10.5625 1.203125q5.28125 1.203125 8.640625 3.21875l-4.609375 9.125q-6.53125 -3.84375 -14.6875 -3.84375q-5.28125 0 -8.015625 1.59375q-2.734375 1.578125 -2.734375 4.15625q0 2.890625 2.921875 4.09375q2.9375 1.1875 9.078125 2.25q6.140625 0.953125 10.078125 2.203125q3.9375 1.25 6.765625 4.234375q2.828125 2.96875 2.828125 8.4375q0 7.203125 -6.234375 11.53125q-6.234375 4.3125 -16.984375 4.3125z" fill-rule="nonzero"/></g></svg>';
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml');

    const animationDiv = document.querySelector('.animation');
    animationDiv.appendChild(svgElement.documentElement);
    const svg = animationDiv.querySelector('#wtm');
    svg.style.position = 'fixed';
    svg.style.opacity = 1 / 2;
    svg.style.bottom = `${200 - 83}px`;
    svg.style.right = `${25 / 5}vw`;
    svg.style.minWidth = `${150 * 2}px`;
    svg.style.width = `${14 * 2}vw`;
    svg.style.height = 'auto';
    svg.style.pointerEvents = 'none';
    svg.style.display = 'block';
    svg.style.visibility = 'visible';
    svg.style.borderWidth = '0px';
    svg.style.border = 'none';
    svg.style.padding = '0px';
    svg.style.margin = '0px';
    this.wm = svg;
  }

  startAudioVerify() {
    if (this.wmInterval) {
      clearInterval(this.wmInterval);
    }

    this.wmInterval = setInterval(() => {
      let styles;
      let wm;
      try {
        wm = document.querySelector('#wtm');
        styles = window.getComputedStyle(wm);
      } catch (error) {
        Sentry.addBreadcrumb({
          message: 'WM log',
          category: 'info',
          data: { wm },
        });
        this.verificationFailed(error);
      }

      try {
        const checks = [
          // !devtools.isOpen || isIframe || isAndroidOrIosValue,
          styles.position === 'fixed',
          wm.style.height === 'auto',
          wm.style.width === `${14 * 2}vw`,
          styles.opacity === `${1 / 2}`,
          styles.bottom === '600px' || wm.style.bottom === `${200 - 83}px`,
          styles.right === '25px' || wm.style.right === `${25 / 5}vw`,
          styles.minWidth === `${150 * 2}px`,
          styles.pointerEvents === 'none',
          styles.display === 'block',
          styles.visibility === 'visible',
          wm.style.border === 'none' || wm.style.border === 'medium none',
          styles.padding === '0px' || styles.padding === '',
          styles.margin === '0px' || styles.margin === '',
        ];

        if (checks.some((check) => !check)) {
          Sentry.addBreadcrumb({
            message: 'Verification failed:',
            category: 'info',
            data: { checks },
          });
          throw new Error('audio tracking error');
        }

        const wm2 = document.querySelectorAll('#wtm *');
        const wm2list = Array.from(wm2);

        wm2list.forEach((el) => {
          const elStyle = window.getComputedStyle(el);

          const checks2 = [
            elStyle.opacity === '1',
            elStyle.visibility === 'visible',
            elStyle.position === 'static',
          ];

          if (checks2.some((check) => !check)) {
            Sentry.addBreadcrumb({
              message: 'Second level Verification failed:',
              category: 'info',
              data: { checks2 },
            });
            throw new Error('audio tracking error 2');
          }
        });
      } catch (error) {
        this.verificationFailed(error);
      }
    }, 1000);
  }

  canPlay() {
    return this.audioLoadPromise;
  }

  play() {
    if (!this.audio) {
      return null;
    }

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // this.audio.currentTime = 92;
      // this.audio.playbackRate = 3;
      this.reset();
      try {
        await this.audio.play();
        this.startAudioVerify();
        const method = setTimeout;
        const times = [24, 48, 72];
        times.forEach((time) => {
          method(() => {
            try {
              const animationDiv = document.querySelector('.animation');
              animationDiv.removeChild(document.querySelector('#wtm'));
              clearInterval(this.wmInterval);
              this.addWm();
              this.startAudioVerify();
            } catch (error) {
              this.verificationFailed(error);
            }
          }, time * 1000);
        });
      } catch (error) {
        reject(error);
        return;
      }

      const endedListener = () => {
        resolve();
        clearInterval(this.wmInterval);
      };
      this.audio.addEventListener('ended', endedListener);
    });
  }

  reset() {
    if (!this.audio) {
      return;
    }
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

export default new AudioController();
