import React from 'react';
import ReactDOM from 'react-dom';

import ApplicationState from './ApplicationState';
import DownloadPage from './DownloadPage/DownloadPage';


const dom = document.querySelector('#reactDownloadPage');

export const mountDownloadPage = async () => {
  const { downloadStatus, key, subpage } = ApplicationState.state;
  // user fast foward and back page problems
  dom.innerHTML = '';

  ReactDOM.render((<DownloadPage
    status={downloadStatus}
    openingKey={key}
    subpage={subpage}
  />), dom);
};

export const unmountDownloadPage = () => {
  ReactDOM.unmountComponentAtNode(dom);
};
