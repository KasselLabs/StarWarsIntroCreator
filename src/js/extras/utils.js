import * as Sentry from '@sentry/browser';

export const documentReady = (handler) => {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler);
  }
};

export const urlHashChange = (handler) => {
  window.addEventListener('hashchange', handler);
};

export const callOnFocus = (callback) => {
  if (window.renderer) {
    callback();
    return;
  }

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
  let cssRuleToChange = null;
  Sentry.addBreadcrumb({
    message: 'Appending CSS Keyframes',
    category: 'appendKeyframesRule',
    data: {
      'styleSheets.length': styleSheets.length,
    },
  });
  // loop in all stylesheets
  for (let i = 0; i < styleSheets.length; i += 1) {
    const styleSheet = styleSheets[i];

    if (cssRuleToChange) {
      break;
    }

    // loop in all css rules
    if (styleSheet.href?.indexOf('necolas') !== -1) {
      try {
        /* eslint-disable-next-line */
        let tryToReadRules = styleSheet.cssRules.length;
      } catch (error) {
        // prevent error on read css rules, go to the next rule.
        /* eslint-disable-next-line */
        continue;
      }

      Sentry.addBreadcrumb({
        message: 'Appending CSS Keyframes',
        category: 'appendKeyframesRule',
        data: {
          i,
          styleSheet,
          'styleSheet.href': styleSheet.href,
        },
      });
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
