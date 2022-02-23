import * as React from 'react';

import { ThemeProvider } from '@emotion/react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app'),
);
