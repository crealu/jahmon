import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app';
import { Provider } from 'react-redux';
import store from './store';
import regeneratorRuntime from 'regenerator-runtime';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
