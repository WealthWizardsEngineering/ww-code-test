/** @jsx jsx */
import { jsx } from '@emotion/react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import configureStore from './store/configure-store';
import App from './App';

const history = createBrowserHistory();
const store = configureStore(history);
const rootEl = document.getElementById('app');

ReactDOM.render(
  <App history={history} store={store} />,
  rootEl,
);
