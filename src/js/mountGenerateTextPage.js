import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '../components/ThemeProvider';

import GenerateTextPage from '../GenerateTextPage/GenerateTextPage';

const dom = document.querySelector('#reactGenerateTextPage');

export const mountGenerateTextPage = async () => {
  ReactDOM.render((
    <ThemeProvider>
      <GenerateTextPage />
    </ThemeProvider>
  ), dom);
};

export const unmountGenerateTextPage = () => {
  ReactDOM.unmountComponentAtNode(dom);
};
