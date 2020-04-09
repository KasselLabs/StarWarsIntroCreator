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
      .replace(/(\s\s[\s]+|\t+)/g, '|')
      .split('\n')
      .map((p) => {
        const split = p.split('|').slice(0, 2);
        console.log(split);
        if (1 === split.length) {
          return p;
        }

        return `<div class="credit-section"><div>${split.join('</div><div>')}</div></div>`;
      })
      .map((p) => {
        const split = p.split('++');
        if (1 === split.length) {
          return p;
        }

        return `<div class="credit-header"><div>${split.join('</div><div>')}</div></div>`;
      })
      .join('</p><p>');
    console.log(paragraphs);

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
  }

  play() {
    this.animationContainer.appendChild(this.animation);

    const textContainer = this.animation.querySelector('#text');
    setTimeout(() => {
      checkChromeBugOnContainer(textContainer, true);
    }, 1500);
  }
}

export default StarWarsAnimation;
