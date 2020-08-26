import { checkSWFontCompatibility } from './extras/auxiliar';
import { appendKeyframesRule } from './extras/utils';
import escapeHtml from './extras/escapeHtml';
import { checkChromeBugOnContainer } from './extras/checkChromeBug';

class StarWarsAnimation {
  constructor() {
    this.animationContainer = document.querySelector('#animationContainer');
    this.animation = null;

    const animation = this.animationContainer.querySelector('.starwarsAnimation');
    this.animationCloned = animation.cloneNode(true);

    this.reset();
  }

  reset() {
    const animation = this.animationContainer.querySelector('.starwarsAnimation');
    if (animation) {
      this.animationContainer.removeChild(animation);
    }

    const cloned = this.animationCloned.cloneNode(true);
    this.animation = cloned;
  }

  prepareBodyText(text) {
    const escapedText = escapeHtml(text);

    const paragraphs = escapedText
      .trim()
      .split('\n')
      .join('</p><p>');

    const breakLineBetweenPs = paragraphs
      .split('<p></p>')
      .join('<br/>');

    const finalHtml = `<p>${breakLineBetweenPs}</p>`;

    return finalHtml;
  }

  load(opening) {
    // animation shortcut
    const { animation } = this;

    // INTRO TEXT
    const introHtml = escapeHtml(opening.intro)
      .replace(/\n/g, '<br>');

    animation.querySelector('#intro').innerHTML = introHtml;

    // EPISODE
    animation.querySelector('#episode').textContent = opening.episode;

    // EPISODE TITLE
    const titleContainer = animation.querySelector('#title');
    titleContainer.textContent = opening.title;
    if (checkSWFontCompatibility(opening.title)) {
      titleContainer.classList.add('SWFont');
    }

    // TEXT
    const textHtml = this.prepareBodyText(opening.text);

    const textContainer = animation.querySelector('#text');
    textContainer.innerHTML = textHtml;

    // TEXT CENTER ALIGNMENT
    textContainer.style.textAlign = opening.center ? 'center' : ''; // empty will not override the justify default rule

    // LOGO
    const starwarsDefaultText = 'star\nwars';
    const logoTextContainer = animation.querySelector('.logoText');
    const logoDefaultContainer = animation.querySelector('#logoDefault');

    const logoText = opening.logo;
    // is default logo
    if (logoText.toLowerCase() === starwarsDefaultText) {
      logoTextContainer.style.display = 'none';
      logoDefaultContainer.style.display = 'block';

      return;
    }

    const logoTextSplit = logoText.split('\n');
    const word1 = logoTextSplit[0];
    const word2 = logoTextSplit[1] || '';

    const wordContainers = logoTextContainer.querySelectorAll('div');
    wordContainers[0].textContent = word1;
    wordContainers[1].textContent = word2;

    logoTextContainer.style.display = 'flex';
    logoDefaultContainer.style.display = 'none';
  }

  play() {
    const DEFAULT_LENGTH = 1977;
    const ANIMATION_CONSTANT = 0.04041570438799076;
    const FINAL_POSITION = 20;

    this.animationContainer.appendChild(this.animation);

    const textContainer = this.animation.querySelector('#text');

    // adjust animation speed
    const titlesContainer = this.animation.querySelector('#titles > div');
    if (titlesContainer.offsetHeight > DEFAULT_LENGTH) {
      const exceedSize = titlesContainer.offsetHeight - DEFAULT_LENGTH;
      const animationFinalPosition = FINAL_POSITION - (exceedSize * ANIMATION_CONSTANT);
      appendKeyframesRule('titlesAnimation', `100% { top: ${animationFinalPosition}% }`);
    }
    setTimeout(() => {
      checkChromeBugOnContainer(textContainer, true);
    }, 1500);
  }
}

export default StarWarsAnimation;
