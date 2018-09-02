import bowser from 'bowser';
import swal from 'sweetalert2';

import ViewController from '../ViewController';

const state = {
  warningAlreadyShow: false,
};

const _alertHTML = `
<div class="alert-box">
  <span>This animation may have rendering issues due to a <span class="bold">Chrome</span> bug.<br/>Please try it on <span class="bold">Firefox</span> for a better experience. Sorry for the inconvenience!</span>
  <button>x</button>
</div>
`;

const _showTopAlert = () => {
  const alertContainer = document.querySelector('#chrome-bug-alert');
  alertContainer.innerHTML = _alertHTML;
  alertContainer.classList.add('show');

  const _hideAlert = () => {
    alertContainer.classList.remove('show');
  };

  alertContainer.querySelector('button').addEventListener('click', _hideAlert);

  setTimeout(() => {
    _hideAlert();
  }, 18000);
};

export const checkChromeBugOnContainer = (textContainer, inAnimation = true) => {
  const mayHaveError = textContainer.offsetHeight > 3000;

  if (!bowser.chrome || !mayHaveError || (inAnimation && state.warningAlreadyShow)) {
    return Promise.resolve();
  }

  state.warningAlreadyShow = true;
  if (inAnimation) {
    _showTopAlert();
    return Promise.resolve();
  }

  return swal(
    'Chrome issue',
    `Warning, the <span class="bold">Chrome</span> browser has issues when rendering long texts in the animation. If you have any issue with the animation, try to use <span class="bold">Firefox</span> browser. This problem doesn't affect the rendered video for download.
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
