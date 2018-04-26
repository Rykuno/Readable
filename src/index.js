import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/index.css';
import './css/App.css';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './routes/routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
