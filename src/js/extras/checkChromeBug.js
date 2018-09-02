import bowser from 'bowser';
import swal from 'sweetalert2';

import ViewController from '../ViewController';

const state = {
  warningAlreadyShow: false,
};

export const checkChromeBugOnContainer = (textContainer, inAnimation = true) => {
  const mayHaveError = textContainer.offsetHeight > 3000;

  if (!bowser.chrome || !mayHaveError || (inAnimation && state.warningAlreadyShow)) {
    return Promise.resolve();
  }

  state.warningAlreadyShow = true;
  if (inAnimation) {
    Raven.captureMessage('Detected possible render issue during animation.', {
      level: 'warning',
    });
    return Promise.resolve();
  }

  return swal(
    'Chrome issue',
    `Warning, the Chrome browser has issues when rendering long texts in the animation. If you have any issue with the animation, try to use Firefox browser. This problem doesn't affect the rendered video for download.
    <br/>Sorry for the inconvenience!`,
    'warning',
  );
};

export const checkChromeRenderBug = async (text) => {
  if (!bowser.chrome) {
    return Promise.resolve();
  }

  const textHtml = ViewController.starWarsAnimation.prepareBodyText(text);

  const animation = ViewController.starWarsAnimation.animationCloned.cloneNode(true);
  const bgSpace = animation.querySelector('#backgroundSpace');
  bgSpace.parentElement.removeChild(bgSpace);
  const logoContainer = animation.querySelector('.verticalWrapper');
  logoContainer.parentElement.removeChild(logoContainer);

  const textContainer = animation.querySelector('#text');
  textContainer.innerHTML = textHtml;

  const animationContainerTest = document.querySelector('#animationContainerTest');
  animationContainerTest.appendChild(animation);

  const result = await checkChromeBugOnContainer(textContainer, false);
  animationContainerTest.removeChild(animation);

  return result;
};
