export const documentReady = (handler) => {
  if (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState) {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler);
  }
};

export const urlHashChange = (handler) => {
  window.addEventListener('hashchange', handler);
};


export const callOnFocus = (callback) => {
  const listener = () => {
    window.removeEventListener('focus', listener, true);
    return callback();
  };

  if (document.hasFocus()) {
    listener();
    return;
  }

  window.addEventListener('focus', listener, true);
};

export const appendKeyframesRule = (keyframeName, ruleToAppend) => {
  const { styleSheets } = document;
  let cssRuleToChange;
  // loop in all stylesheets
  for (let i = 0; i < styleSheets.length; i += 1) {
    const styleSheet = styleSheets[i];
    // loop in all css rules
    if (!styleSheet.href || -1 === styleSheet.href.indexOf('necolas')) {
      for (let j = 0; j < styleSheet.cssRules.length; j += 1) {
        const rule = styleSheet.cssRules[j];
        if (rule.name === keyframeName && rule.type === window.CSSRule.KEYFRAMES_RULE) {
          cssRuleToChange = rule;
          // keep looping to get the last matching rule.
        }
      }
    }
  }
  if (cssRuleToChange) {
    cssRuleToChange.appendRule(ruleToAppend);
  }
};

export const isFromBrazil = () => {
  const browserLanguage = navigator.language || navigator.userLanguage;
  const ptBR = 'pt-BR';
  if (ptBR === browserLanguage) {
    return true;
  }

  const languages = navigator.languages || [];
  if (languages.indexOf(ptBR) > -1) {
    return true;
  }

  return false;
};
