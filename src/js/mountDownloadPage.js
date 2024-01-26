import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '../components/ThemeProvider';

import ApplicationState from './ApplicationState';
import DownloadPage from './DownloadPage/DownloadPage';

const dom = document.querySelector('#reactDownloadPage');

export const mountDownloadPage = async () => {
  const { downloadStatus, key, subpage } = ApplicationState.state;
  // user fast foward and back page problems
  dom.innerHTML = '';

  ReactDOM.render((
    <ThemeProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      {/* <CssBaseline /> */}
      <DownloadPage
        status={downloadStatus}
        openingKey={key}
        subpage={subpage}
      />
    </ThemeProvider>
  ), dom);
};

export const unmountDownloadPage = () => {
  ReactDOM.unmountComponentAtNode(dom);
};
