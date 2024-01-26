import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffd54e',
    },
    secondary: {
      main: '#0D0D0D',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      main: '#ffd54e',
    },
  },
  overrides: {
    MuiDialog: {
      paper: {
        background: '#0D0D0D',
      },
    },
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      { children }
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
