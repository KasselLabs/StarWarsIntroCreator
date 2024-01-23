import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import ApplicationState from './ApplicationState';
import DownloadPage from './DownloadPage/DownloadPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#000'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
})

const dom = document.querySelector('#reactDownloadPage');

export const mountDownloadPage = async () => {
  const { downloadStatus, key, subpage } = ApplicationState.state;
  // user fast foward and back page problems
  dom.innerHTML = '';

  ReactDOM.render((
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
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
